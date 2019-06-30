package com.google.codeu.servlets;

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
    List<Location> loc;

    String user = request.getParameter("user");
    if (user == null || user.equals("")) {
      // No user speficied, return all locations
      loc = datastore.getAllLocations();
    }
    else{
      loc = datastore.getUserSpecificLocations(user);
    }
    Collections.sort(loc, (x, y) -> {return -Integer.compare(x.getCount(), y.getCount());});

    Gson gson = new Gson();
    String json = gson.toJson(loc);
    response.getOutputStream().println(json);
  }
}
