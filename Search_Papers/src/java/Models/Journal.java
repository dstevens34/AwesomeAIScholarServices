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
public class Journal {
    
    private int _index;
    private String _journal_Name, _phone_Number;
    private Address _address;
    
    public Journal()
    {
        
    }
    
    public Journal(int index, String journal_name)
    {
        set_Index(index);
        set_Journal_Name(journal_name);
        set_Phone_Number("");
        set_Address(null);
    }
    
    public Journal(int index, String journal_name, String phone_number)
    {
        set_Index(index);
        set_Journal_Name(journal_name);
        set_Phone_Number(phone_number);
        set_Address(null);
    }    
    
    public Journal(int index, String journal_name, String phone_number, Address address)
    {
        set_Index(index);
        set_Journal_Name(journal_name);
        set_Phone_Number(phone_number);
        set_Address(address);
    }
    
    public int get_Index()
    {
        return _index;
    }
    
    private void set_Index(int index)
    {
        _index = index;
    }
    
    public String get_Journal_Name()
    {
        return _journal_Name;
    }
    
    private void set_Journal_Name(String journal_Name)
    {
        _journal_Name = journal_Name;
    }
    
    public String get_Phone_Number()
    {
        return _phone_Number;
    }
    
    private void set_Phone_Number(String phone_number)
    {
        _phone_Number = phone_number;
    }
    
    public Address get_Address()
    {
        return _address;
    }
    
    private void set_Address(Address address)
    {
        _address = address;
    }    
}
