/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Models;

import java.util.List;

/**
 *
 * @author Carrot
 */
public class Paper {
    
    private int _index;
    private String _title, _abstract, _print_issn, _online_issn, _language, _page_Start, _page_End, _doi, _url, _journal_ID;
    private Journal _journal;
    private List<Author> _authors;
    private List<Tag> _tags;
    private List<Paper> _refernces;
    
    public Paper()
    {
        
    }
    
    public Paper(int index, String title)
    {
        set_Index(index);
        set_Title(title);
    }
        
    public int get_Index()
    {
        return _index;
    }
    
    private void set_Index(int index)
    {
        _index = index;
    }
    
    public String get_Title()
    {
        return _title;
    }
    
    private void set_Title(String title)
    {
        _title = title;
    }
    
    public String get_Abstract()
    {
        return _abstract;
    }
    
    private void set_Abstract(String str_abstract)
    {
        _abstract = str_abstract;
    }
    
    public String get_Print_ISSN()
    {
        return _print_issn;
    }
    
    private void set_Print_ISSN(String print_ISSN)
    {
        _print_issn = print_ISSN;
    }
    public String get_Online_ISSN()
    {
        return _online_issn;
    }
    
    private void set_Online_ISSN(String online_ISSN)
    {
        _online_issn = online_ISSN;
    }
    
    public String get_Language()
    {
        return _language;
    }
    
    private void set_Language(String language)
    {
        _language = language;
    }
    
    public String get_Page_Start()
    {
        return _page_Start;
    }
    
    private void set_Page_Start(String page_start)
    {
        _page_Start = page_start;
    }
    
    public String get_Page_End()
    {
        return _page_End;
    }
    
    private void set_Page_End(String page_end)
    {
        _page_End = page_end;
    }
    
    public String get_DOI()
    {
        return _doi;
    }
    
    private void set_DOI(String doi)
    {
        _doi = doi;
    }
    
    public String get_URL()
    {
        return _url;
    }
    
    private void set_URL(String url)
    {
        _url = url;
    }
    
    public String get_Journal_ID()
    {
        return _journal_ID;
    }
    
    private void set_Journal_ID(String journal_ID)
    {
        _journal_ID= journal_ID;
    }
    
    public Journal get_Journal()
    {
        return _journal;
    }
    
    private void set_Journal(Journal journal)
    {
        _journal = journal;
    }
    
    public List<Author> get_Authors()
    {
        return _authors;
    }
    
    public void add_Author(Author author)
    {
        _authors.add(author);
    }
    
    public List<Tag> get_Tags()
    {
        return _tags;
    }
    
    public void add_Tag(Tag tag)
    {
        _tags.add(tag);
    }
    
    public List<Paper> get_References()
    {
        return _refernces;
    }
    
    public void add_Referemce(Paper paper)
    {
        _refernces.add(paper);
    }
}
