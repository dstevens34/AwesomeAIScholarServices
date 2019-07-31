(function () {

    var mysql = require("mysql");

    var con = mysql.createConnection({
        'host': 'alistestdbinstance.cnuohhom88jo.us-west-2.rds.amazonaws.com',
        'user': 'Team_Awesome',
        'password': 'Awesome_Team',
        'database': 'CS6460'
    });

    con.connect(function (err) {
        if (err) {
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
    });


    var getPapersSQL = "Select DISTINCT Journal_Paper.URL, Paper.Title, Paper.Abstract, Paper.Print_ISSN, Paper.Online_ISSN, Paper.DOI, \
    (SUM(Paper_Tag.Relevance)/Count(Paper_Tag.Relevance)) As compound_relevance, \
    GROUP_CONCAT(DISTINCT Paper_Tag.Tag ORDER BY Paper_Tag.Relevance) As matched_tags, Paper.index \
    From Journal_Publication \
    Join Journal_Paper \
    On Journal_Publication.Index = Journal_Paper.Journal_Index \
    Join Paper \
    On Journal_Paper.Paper_Index = Paper.Index \
    Join Paper_Tag \
    ON Paper.Index = Paper_Tag.Paper_Index \
    Join Tags \
    On Paper_Tag.Tag = Tags.Tag \
    where Paper_Tag.Tag in (%%tags%%) \
    group by Paper.Index \
    order by compound_relevance DESC \
    limit 200"
	
	var getPapersTagsSQL = "Select Paper.Index as 'index', Paper_Tag.Tag as tag, Paper_Tag.Relevance as Relevance \
    From Paper \
    Join Paper_Tag \
    ON Paper.Index = Paper_Tag.Paper_Index \
    Join Tags \
    On Paper_Tag.Tag = Tags.Tag \
    where Paper_Tag.Paper_Index in (%%paperIndexes%%) "

    var addUserSQL = "INSERT INTO User (UserId,Password,First_Name,Last_Name,Email,Status) \
    VALUES ('%%UserId%%','%%Password%%','%%First_Name%%','%%Last_Name%%','%%Email%%','%%Status%%') \
    ON DUPLICATE KEY UPDATE Status='%%Status%%'";
	
	var addSessionSQL = "INSERT INTO Sessions (UserID,Query ) \
    VALUES ('%%UserId%%','%%Query%%')";
	
	var addPaperVoteSQL = "INSERT INTO Session_Knowledge (Session_Index, Paper_Index, Vote ) \
    VALUES ('%%SessionIndex%%','%%PaperIndex%%', '%%Vote%%')";
	
	var addSavedPaperSQL = "INSERT INTO Saved_Papers (Session_Index, Paper_Index) \
    VALUES ('%%SessionIndex%%','%%PaperIndex%%')";

    var findUserByIdSQL = "SELECT * FROM User where UserId='%%UserId%%'";

	var findUserSessionsSQL = "SELECT * FROM Sessions AS s where s.UserId='%%UserId%%' ORDER BY s.Index DESC";

    var findLastUserSessionsSQL = "SELECT * FROM Sessions AS s where s.UserId='%%UserId%%' ORDER BY s.Index DESC LIMIT 1";

	var findSavedPapersSQL = "Select DISTINCT Journal_Paper.URL, Paper.Title, Paper.Abstract, Paper.Print_ISSN, Paper.Online_ISSN, Paper.DOI, Paper.index \
    FROM Saved_Papers \
    Join Sessions \
    on Sessions.Index = Saved_Papers.Session_Index \
    Join Paper \
    on Paper.Index = Saved_Papers.Paper_Index \
    Join Journal_Paper \
    on Paper.Index = Journal_Paper.Paper_Index \
    where Sessions.UserID = '%%UserId%%'";
	
	var findSessionKnowledgeSQL = "SELECT * FROM Session_Knowledge AS s where s.Session_Index = %%SessionIndex%% ORDER BY s.Index DESC";;
	
	var findVotingTagsSQL = 
	"Select DISTINCT Paper_Tag.Tag as tag, Sum(Session_Knowledge.Vote) as vote \
	From Session_Knowledge \
	Join Paper_Tag \
	On Session_Knowledge.Paper_Index = Paper_Tag.Paper_Index \
	where Session_Knowledge.Session_Index = %%SessionIndex%% \
	group by Paper_Tag.Tag"
	
    var addUser = function(UserId,Password,First_Name,Last_Name,Email,Status,func){
        if(UserId == null){
            console.log('null user provided');
            if(func)
                func('null user provided');
            return;
        }
 
        var sql = addUserSQL.replace('%%UserId%%', UserId)
                            .replace('%%Password%%', Password)
                            .replace('%%First_Name%%', First_Name)
                            .replace('%%Last_Name%%', Last_Name)
                            .replace('%%Email%%', Email)
                            .replace('%%Status%%', Status)
                            .replace('%%Status%%', Status);
        con.query(sql, func);
    }
	
	var addSession = function(UserId, Query, func){
        if(UserId == null){
            console.log('null user provided');
            if(func)
                func('null user provided');
            return;
        }
		
		if(Query == null){
            console.log('null query provided');
            if(func)
                func('null query provided');
            return;
        }

        var sql = addSessionSQL.replace('%%UserId%%', UserId)
                            .replace('%%Query%%', Query);
        con.query(sql, func);
    }
	
	var addPaperVote = function(Session_Index, Paper_Index, Vote, func){
        console.log('add paper vote');
        console.log(Session_Index+'---'+Paper_Index+'---'+Vote);
        if(Session_Index == null){
            console.log('null session provided');
            if(func)
                func('null session provided');
            return;
        }
		 
		if(Paper_Index == null){
            console.log('null paper provided');
            if(func)
                func('null paper provided');
            return;
        }
		
		if(Vote == null){
            console.log('null vote provided');
            if(func)
                func('null vote provided');
            return;
        }

        var sql = addPaperVoteSQL.replace('%%SessionIndex%%', Session_Index)
								.replace('%%PaperIndex%%', Paper_Index)
								.replace('%%Vote%%', Vote);
        con.query(sql, func);
    }
	
	var addSavedPaper = function(Session_Index, Paper_Index, func){
        console.log('addSavedPaper');
        console.log(Session_Index+'---'+Paper_Index);
        if(Session_Index == null){
            console.log('null session provided');
            if(func)
                func('null session provided');
            return;
        }
		
		if(Paper_Index == null){
            console.log('null paper provided');
            if(func)
                func('null paper provided');
            return;
        }
		
        var sql = addSavedPaperSQL.replace('%%SessionIndex%%', Session_Index)
								.replace('%%PaperIndex%%', Paper_Index);
		
		var continueProcessing = function(err, rows){
            addPaperVote(Session_Index, Paper_Index, 2, func);
        }
		
        con.query(sql, continueProcessing);
    }
		
	var getSessions = function(UserID, func)
	{
		var sql = findUserSessionsSQL.replace('%%UserId%%', UserID);
        con.query(sql, func);
	}

    var getLastSession = function(UserID, func)
    {
        var sql = findLastUserSessionsSQL.replace('%%UserId%%', UserID);
        con.query(sql, func);
    }
	
	var getSavedPapers = function(UserID, func)
	{
		var sql = findSavedPapersSQL.replace('%%UserId%%', UserID);
        con.query(sql, func);
	}
	
	var getSessionKnowledge = function(Session_Index, func)
	{
		var sql = findSessionKnowledgeSQL.replace('%%SessionIndex%%', Session_Index);
        con.query(sql, func);
	}
	
	var getVotingTags = function(Session_Index, func)
	{
		var sql = findVotingTagsSQL.replace('%%SessionIndex%%', Session_Index);
        con.query(sql, func);
	}

    var getUser = function (UserId, func) {
        var sql = findUserByIdSQL.replace('%%UserId%%', UserId);
        con.query(sql, func);
    }

    var getPapers = function (tagArr, session_index,func) {
        var Papers = null;
        var Tags = null;
        var Paper_Tag_Relv = null;

        console.log('session index : '+session_index);
		
        var continueProcessing3 = function(err,rows){
            Paper_Tag_Relv = rows;
            // console.log('herererere');
            console.log(JSON.stringify(Paper_Tag_Relv));
            // console.log('before changing relevance : \n\n'+JSON.stringify(Papers));
            for(var otterindex = 0; otterindex < Tags.length; otterindex++)
            {
                var found = false;
                for(var innerindex = 0; innerindex < Paper_Tag_Relv.length; innerindex++)
                {
                    // console.log(Paper_Tag_Relv[otterindex].tag + '==' +Tags[innerindex].tag);
                    if(Tags[otterindex].tag == Paper_Tag_Relv[innerindex].tag)
                    {
                        found = true;
                        console.log('found');
                        if(tagArr.indexOf(Tags[otterindex].tag) >= 0)
                        {
                            //This Paper_Tag has both a vote tag and a query tag
                            Tags[otterindex].Relevance += (Paper_Tag_Relv[innerindex].vote/8) * Tags[otterindex].Relevance;
                        }
                        else
                        {
                            //This Paper_tag does not have a query tag but does have a vote tag
                            Tags[otterindex].Relevance = (Paper_Tag_Relv[innerindex].vote/8) * Tags[otterindex].Relevance;
                        }
                        break;
                    }
                }
                
                if(found == false)
                {
                    if(tagArr.indexOf(Tags[otterindex].tag) < 0)
                    {
                        //This tag is not a query tag nor in the voting tag list ignore it
                        Tags[otterindex].Relevance = 0;
                    }
                }
            }
            console.log("first loop");  
            
            //need to put everything back together
            console.log('Paper_Tag_Relv : '+JSON.stringify(Paper_Tag_Relv));
            for(var otterindex = 0; otterindex < Papers.length; otterindex++)
            {
                var relevance = 0;
                
                //this will go through and add all the relevance of a paper back together
                for(var index = 0; index < Tags.length; index++)
                {
                    if(Tags[index].index == Papers[otterindex].index)
                        relevance += Tags[index].Relevance;
                }
                console.log('before compound_relevance : '+Papers[otterindex].compound_relevance);
                Papers[otterindex].compound_relevance = relevance;
                console.log('after compound_relevance : '+Papers[otterindex].compound_relevance);
            }
			
			var max = -100000
			var min = 100000
			
			for(var index = 0; index < Papers.length; index++)
			{
				if(Papers[index].compound_relevance > max)
					max = Papers[index].compound_relevance + .1;
				
				if(Papers[index].compound_relevance < min)
					min = Papers[index].compound_relevance - .1;
			}
			
			for(var index = 0; index < Papers.length; index++)
			{
				Papers[index].compound_relevance = (Papers[index].compound_relevance -(min))/(max - min);
			}
			

            //console.log('------------\n\n after changing relevance : \n\n'+JSON.stringify(Papers));
            console.log("second loop");
						
			Papers.sort(function(a, b) { return parseFloat(b.compound_relevance) - parseFloat(a.compound_relevance); });
			
			Papers.splice(50, 4000);
			
            func(null,Papers);
        }

        var continueProcessing2 = function(err, rows){
            //console.log(JSON.stringify(err));
            Tags = rows;
            console.log("Paper_Tags"); 
            //getting the vote_tags
            var sql = findVotingTagsSQL.replace('%%SessionIndex%%', session_index);
            con.query(sql, continueProcessing3);
            //getting the papers_tags                 
        }

        var continueProcessing1 = function(err, rows){
            Papers = rows;
            console.log("papers");
            //this is added by David Stevens Please review
            var PaperIndexes = new Array(Papers.length);
            
            //pulls just the paper indexes
            for(var index  = 0; index < Papers.length; index++)
            {
                PaperIndexes[index] = Papers[index].index;
            }
            var tagsStr = createPaperIndexStringForSQL(PaperIndexes);
            console.log(tagsStr);
            var sql = getPapersTagsSQL.replace('%%paperIndexes%%', tagsStr);
            con.query(sql, continueProcessing2);
        }

        var tagStr = createTagStringForSQL(tagArr);
        var sql = getPapersSQL.replace('%%tags%%', tagStr);
        con.query(sql, continueProcessing1);
    }

    var createTagStringForSQL = function (tagArr) {
        var str = "";
        str += "'" + tagArr[0] + "'";
        for (var i = 1; i < tagArr.length; i++) {
            var tag = tagArr[i];
            str += ",'" + tag + "'";
            tag = tagArr[i - 1] + " " + tagArr[i];
            str += ",'" + tag + "'";
        }
        return str;
    }

    var createPaperIndexStringForSQL = function (tagArr) {
        var str = "";
        str += "'" + tagArr[0] + "'";
        for (var i = 1; i < tagArr.length; i++) {
            var tag = tagArr[i];
            str += ",'" + tag + "'";
        }
        return str;
    }
	
    module.exports.getPapers = getPapers;
    module.exports.addUser = addUser;
    module.exports.getUser = getUser;
    module.exports.addSession = addSession;
    module.exports.getSessions = getSessions;
    module.exports.getLastSession = getLastSession;
	module.exports.addPaperVote = addPaperVote;
	module.exports.addSavedPaper = addSavedPaper;
    module.exports.getSavedPapers = getSavedPapers;
} ());