package com.google.codeu.data;

public class Location {

  private String id;
  private String name;
  private double lat;
  private double lng;
  private int count;

  public Location(String id, String name, double lat, double lng) {
    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.count = 1;
  }

  public String getId() {
    return id;
  }

  public double getLat() {
    return lat;
  }

  public double getLng() {
    return lng;
  }

  public String getName() {
    return name;
  }

  public int getCount() { return count; }

  public void setCount(int count) {
    this.count = count;
  }
}
