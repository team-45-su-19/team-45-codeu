import java.util.ArrayList;
import java.util.List;
import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;

/**Handles fetching and saving markers for the map.*/
@WebServlet("/markers")
public class MarkerServlet extends HttpServlet {
    /**
     * Responds with a JSON representation of markers. 
     */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        List<Marker> markers = getMarkers();
        Gson gson = new Gson();
        String json = gson.toJson(markers);
        response.getOutputStream().println(json);
    }

    /**
     * Stores a marker.
     */
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        double lat = Double.parseDouble(request.getParameter("lat"));
        double lng = Double.parseDouble(request.getParameter("lng"));
        Marker marker = new Marker(lat, lng);
        storeMarker(marker);
    }

    private List<Marker> getMarkers() {
        List<Marker> markers = new ArrayList<>();

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Query query = new Query("Marker");
        PreparedQuery results = datastore.prepare(query);

        for (Entity entity : results.asIterable()) {
            double lat = (double) entity.getProperty("lat");
            double lng = (double) entity.getProperty("lng");
            Marker marker = new Marker(lat, lng);
            markers.add(marker);
        }
        return markers;
    }

    public void storeMarker(Marker marker) {
        Entity markerEntity = new Entity("Marker");
        markerEntity.setProperty("lat", marker.getLat());
        markerEntity.setProperty("lng", marker.getLng());

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        datastore.put(markerEntity);
    }
    private static class Marker {
        double lat;
        double lng;

        Marker(double lat, double lng) {
            this.lat = lat;
            this.lng = lng;
        }

        double getLat() {
            return lat;
        }

        double getLng() {
            return lng;
        }
    }
}