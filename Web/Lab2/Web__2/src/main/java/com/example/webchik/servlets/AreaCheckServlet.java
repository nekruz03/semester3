package com.example.webchik.servlets;

import com.example.webchik.model.Shot;
import com.example.webchik.model.ShotCollectionManager;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;

@WebServlet(name = "AreaCheckServlet", value = "/check")
public class AreaCheckServlet extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        LocalDateTime startTime = LocalDateTime.now(ZoneOffset.UTC);
        try {
            double x = Double.parseDouble(req.getParameter("x"));
            double y = Double.parseDouble(req.getParameter("y"));
            double r = Double.parseDouble(req.getParameter("r"));
            if (!validation(x, y, r)) {
                resp.setStatus(400);
                return;
            }
            Boolean status = isHit(x, y, r);
            resp.getWriter().println(status);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            ShotCollectionManager.add(new Shot(x, y, r,
                    startTime.minusMinutes(Long.parseLong(req.getParameter("timezone"))).format(formatter),
                    Math.round(LocalDateTime.now().minusNanos(startTime.getNano()).getNano() * 0.001),
                    status));
            getServletContext().setAttribute("collection", ShotCollectionManager.getCollection());
            req.getRequestDispatcher("/result.jsp").include(req, resp);
        }catch (NullPointerException e){
            resp.setStatus(400);
        }
    }

    private boolean validation(double x, double y, double r){
        return y>-5 && y<5 && x>=-5 && x<=3 && r>=1 && r<=3;
    }

    private boolean isHit(double x, double y, double r){
        return isCircleZone(x, y, r) || isTriangleZone(x, y, r) || isRectangleZone(x, y, r);
    }
    private boolean isRectangleZone(double x, double y, double r){
        return (x<=0) && (y>=0) && (x>=(-1)*r) && (y<=r/2);
    }
    private boolean isCircleZone(double x, double y, double r){
        return (x*x + y*y <= (r/2)*(r/2) ) && (x>=0) && (y<=0) && (x<=r/2) && (y>= (-1)*(r/2));
    }
    private boolean isTriangleZone(double x, double y, double r){
        return (x<=0) && (y<=0) && (y>=(-2)*x-r);
    }

}