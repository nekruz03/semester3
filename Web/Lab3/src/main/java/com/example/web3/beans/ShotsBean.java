package com.example.web3.beans;

import com.example.web3.utils.*;
import com.example.web3.entity.Shot;
import com.example.web3.dao.ShotDao;

import jakarta.faces.context.ExternalContext;
import jakarta.faces.context.FacesContext;
import jakarta.servlet.http.HttpServletResponse;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import jakarta.inject.Named;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;

@Named("shotsBean")
@SessionScoped

public class ShotsBean implements Serializable {
    private Shot shot;
    private ShotDao shotDao;
    private List<Shot> shotsList;
    private int timezone;

    private final double[] rValues = {1, 1.5, 2, 2.5, 3};


    @PostConstruct
    public void postConstruct() {
        shot = new Shot();
        shotDao = new ShotDao();
        shotDao.createEntityManager();
        shotsList = shotDao.getShotsFromDB();
    }


    public void add() {
        LocalDateTime startTime = LocalDateTime.now(ZoneOffset.UTC);
        if (Validator.isValid(shot)) {
            shot.setStatus(AreaHitChecker.isHit(shot));
            shot.setCurrentTime(startTime.minusMinutes(getTimezone()).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            shot.setScriptTime(Math.round(LocalDateTime.now().minusNanos(startTime.getNano()).getNano() * 0.001));
            shotsList.add(shot);
            shotDao.addShotToDB(shot);
            shot = new Shot();
        } else {
            ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
            HttpServletResponse response = (HttpServletResponse) context.getResponse();
            response.setStatus(500);
        }
    }

    public void addThroughPlot(){
        String string_x = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("x");
        String string_y = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("y");
        String string_r = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("r");
        shot.setX(Double.parseDouble(string_x));
        shot.setY(Double.parseDouble(string_y));
        shot.setR(Double.parseDouble(string_r));
        add();
    }

    public void clear(){
        shotDao.clearShotsInBD();
        shotsList = shotDao.getShotsFromDB();
    }

    public void setTimezone() {
        timezone = Integer.parseInt(FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("timezone"));
    }

    private int getTimezone() {
        return timezone;
    }

    public Shot getShot() {
        return shot;
    }

    public void setShotsList(LinkedList<Shot> shotsList) {
        this.shotsList = shotsList;
    }

    public List<Shot> getShotsList() {
        return shotsList;
    }

    public void setFirstRValue(){
        shot.setR(rValues[0]);
    }

    public void setSecondRValue() {
        shot.setR(rValues[1]);
    }

    public void setThirdRValue() {
        shot.setR(rValues[2]);
    }

    public void setFourthRValue() {
        shot.setR(rValues[3]);
    }

    public void setFifthRValue() {
        shot.setR(rValues[4]);
    }

}
