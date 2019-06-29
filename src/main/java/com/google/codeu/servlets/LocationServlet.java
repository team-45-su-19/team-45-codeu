package com.google.codeu.servlets;

import java.util.HashMap;
import java.util.SortedMap;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.io.IOException;
import com.google.codeu.data.Datastore;
import com.google.codeu.data.Location;
import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Location")
public class LocationServlet extends HttpServlet {

	private Datastore datastore;

  @Override
  public void init() {
    datastore = new Datastore();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
  	response.setContentType("application/json");
    List<LocationCount> loc = datastore.getLocationCount();
    Collections.sort(loc, (x, y) -> {return -Integer.compare(x.count, y.count);});
    
    Gson gson = new Gson();
    String json = gson.toJson(loc);

    response.getOutputStream().println(json);
  }

  public static class LocationCount {
  	private double lat;
  	private double lng;
  	private int count;
  	private String id;
  	private String name;

  	public LocationCount(String lat, String lng, int count, String id, String name) {
  		this.lat = Double.parseDouble(lat);
  		this.lng = Double.parseDouble(lng);
  		this.count = count;
  		this.id = id;
  		this.name = name;
  	}
  }
}
