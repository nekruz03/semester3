package com.example.webchik.model;

import java.time.LocalDateTime;

public class Shot {
    private String timezone;
    private long scriptTime;
    private double x;
    private double y;
    private double r;

    private boolean status;

    public Shot(double x, double y, double r, String timezone, long scriptTime, boolean status){
        this.x = x;
        this.y = y;
        this.r = r;
        this.timezone = timezone;
        this.scriptTime = scriptTime;
        this.status = status;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean isStatus() {
        return status;
    }

    public String getTimezone() {
        return timezone;
    }

    public long getScriptTime() {
        return scriptTime;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public void setScriptTime(long scriptTime) {
        this.scriptTime = scriptTime;
    }
}
