package com.springajax.controller;

import com.springajax.models.Product;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping(value = "ajax")
public class AjaxController {
    @RequestMapping(value = {"/home","/"}, method = RequestMethod.GET)
    public String homepage() {
        return "homePage";
    }

    @RequestMapping(value = "resultajax", method = RequestMethod.GET)
    @ResponseBody
    public String resultajax() {
        return "Hello world";
    }

    @RequestMapping(value = "sumajax", method = RequestMethod.GET)
    public @ResponseBody String sumAjax(HttpServletRequest request) {
        int a = 0, b = 0, sum = 0;
        try {
            a = Integer.parseInt(request.getParameter("a"));
            b = Integer.parseInt(request.getParameter("b"));
            sum = a + b;
        } catch (Exception e) {

        }
        return sum + "";
    }

    // Result data Json
    @RequestMapping(value = "jsonObject", method = RequestMethod.GET)
    public @ResponseBody List<Product> jsonObject() {
        List<Product> products = new ArrayList<Product>();
        products.add(new Product(1, "Giày dép", 120000,"a.png"));
        products.add(new Product(2, "Quần áo", 120000,"b.png"));
        products.add(new Product(3, "Tủ lạnh", 120000,"c.png"));
        products.add(new Product(4, "Xoong nồi", 120000,"d.png"));
        products.add(new Product(5, "Phụ kiện", 120000,"e.png"));
        return products;
    }


    @RequestMapping(value = "search", method = RequestMethod.GET)
    public String searchData(HttpServletRequest request, ModelMap modelMap){
        String key = request.getParameter("keySearch");
        modelMap.put("msg", key);
        return "homePage";
    }


    @RequestMapping(value = { "/contactus" }, method = RequestMethod.GET)
    public String contactusPage(Model model) {
        model.addAttribute("address", "Vietnam");
        model.addAttribute("phone", "...");
        model.addAttribute("email", "...");
        return "contactusPage";
    }

    @RequestMapping(value = { "/dataPage" }, method = RequestMethod.GET)
    public String dataPage(Model model) {
        return "dataPage";
    }

    @RequestMapping(value = { "/tablePage" }, method = RequestMethod.GET)
    public String tablePage(Model model) {
        return "tablePage";
    }

    // Result data Json
    @RequestMapping(value = "/dataJson", method = RequestMethod.GET)
    public @ResponseBody List<Product> dataJson() {
        List<Product> products = new ArrayList<Product>();
        products.add(new Product(1, "Giày dép", 120000,"a.png"));
        products.add(new Product(2, "Quần áo", 120000,"b.png"));
        products.add(new Product(3, "Tủ lạnh", 120000,"c.png"));
        products.add(new Product(4, "Xoong nồi", 120000,"d.png"));
        products.add(new Product(5, "Phụ kiện", 120000,"e.png"));
        return products;
    }

}
