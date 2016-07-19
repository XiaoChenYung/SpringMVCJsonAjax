package com.springajax.models;

import java.io.Serializable;
import java.util.Date;

/**
 * author Hoangptit
 * Date 6/8/2016
 */
public class Product implements Serializable {
    private int id;
    private String title;
    private double price;
    private String image;

    public Product() {
    }

    public Product(int id, String title, double price, String image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
