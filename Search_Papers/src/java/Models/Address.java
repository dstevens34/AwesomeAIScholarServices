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
public class Address {
    
    private int _index;
    private String _street_One, _street_Two, _city, _state, _country, _zip;
    
    
    public Address()
    {
        
    }
    
    public Address(int index, String street_one, String street_two, String city, String country, String zip)
    {
        set_Index(index);
        set_Street_One(street_one);
        set_Street_Two(street_two);
        set_City(city);
        set_Country(country);
        set_Zip(zip);
    }
    
    public int get_Index()
    {
        return _index;
    }
    
    private void set_Index(int index)
    {
        _index = index;
    }
    
    public String get_Street_One()
    {
        return _street_One;
    }
    
    private void set_Street_One(String street_one)
    {
        _street_One = street_one;
    }
    
    public String get_Street_Two()
    {
        return _street_Two;
    }
    
    private void set_Street_Two(String street_two)
    {
        _street_Two = street_two;
    }
    
    public String get_City()
    {
        return _city;
    }
    
    private void set_City(String city)
    {
        _city = city;
    }
    
    public String get_Country()
    {
        return _country;
    }
    
    private void set_Country(String country)
    {
        _country = country;
    }
    
    public String get_Zip()
    {
        return _zip;
    }
    
    private void set_Zip(String zip)
    {
        _zip = zip;
    }
    
    
}
