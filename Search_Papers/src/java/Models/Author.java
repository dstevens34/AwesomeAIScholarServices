/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Models;

/**
 *
 * @author Carrot
 */
public class Author {
    
    private int _index;
    private String _prefix, _first_Name, _last_Name, _middle_Name, _suffix, _email, _status, _userId;
    private User _user;
    
    
    public Author()
    {
        
    }
    
    public Author(int index, String prefix, String first_name, String last_name, String middle_name, String suffix, String email, String status, String userID)
    {
        set_Index(index);
        set_prefix(prefix);
        set_First_Name(first_name);
        set_Last_Name(last_name);
        set_Middle_Name(middle_name);
        set_Suffix(suffix);
        set_Email(email);
        set_Status(status);
        set_UserID(userID);
        set_User(null);
    }
    
    public Author(int index, String prefix, String first_name, String last_name, String middle_name, String suffix, String email, String status, String userID, User user)
    {
        set_Index(index);
        set_prefix(prefix);
        set_First_Name(first_name);
        set_Last_Name(last_name);
        set_Middle_Name(middle_name);
        set_Suffix(suffix);
        set_Email(email);
        set_Status(status);
        set_UserID(userID);
        set_User(user);
    }
    
    public int get_Index()
    {
        return _index;
    }
    
    private void set_Index(int index)
    {
        _index = index;
    }
    
    public String get_prefix()
    {
        return _prefix;
    }
    
    private void set_prefix(String prefix)
    {
        _prefix = prefix;
    }
    
    public String get_Last_Name()
    {
        return _last_Name;
    }
    
    private void set_Last_Name(String last_name)
    {
        _last_Name = last_name;
    }
    
    public String get_First_Name()
    {
        return _first_Name;
    }
    
    private void set_First_Name(String first_Name)
    {
        _first_Name = first_Name;
    }
    public String get_Middle_Name()
    {
        return _middle_Name;
    }
    
    private void set_Middle_Name(String middle_name)
    {
        _middle_Name = middle_name;
    }
    
    public String get_Suffix()
    {
        return _suffix;
    }
    
    private void set_Suffix(String suffix)
    {
        _suffix = suffix;
    }
    
    public String get_Email()
    {
        return _email;
    }
    
    private void set_Email(String email)
    {
        _email = email;
    }
    
    public String get_Status()
    {
        return _status;
    }
    
    private void set_Status(String status)
    {
        _status = status;
    }
    
    public String get_UserID()
    {
        return _userId;
    }
    
    private void set_UserID(String UserID)
    {
        _userId = UserID;
    }
    
    public User get_user()
    {
        return _user;
    }
    
    private void set_User(User user)
    {
        _user = user;
    }
    
}
