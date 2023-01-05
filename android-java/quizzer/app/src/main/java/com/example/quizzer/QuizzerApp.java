package com.example.quizzer;

import android.app.Application;
import android.content.res.Configuration;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.jsoup.Jsoup;

import java.util.ArrayList;

public class QuizzerApp extends Application {
    // Called when the application is starting, before any other application objects have been created.
    // Overriding this method is totally optional!

    @Override
    public void onCreate() {
        super.onCreate();
        // Required initialization logic here!
        //get categories
        if(QuizDbHelper.getInstance(this).getAllCategories().size() == 0) {
            String url = "https://opentdb.com/api_category.php";
            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                    (Request.Method.GET, url, null, new Response.Listener<JSONObject>() {

                        @Override
                        public void onResponse(JSONObject response) {
                            try {
                                JSONArray array = response.getJSONArray("trivia_categories");
                                for (int i = 0; i < array.length(); i++) {
                                    Category category = new Category();
                                    JSONObject obj = (JSONObject) array.get(i);
                                    category.setId((int) obj.get("id"));
                                    category.setName(Jsoup.parse((String) obj.get("name")).text());
                                    QuizDbHelper.getInstance(getApplicationContext()).addCategory(category);
                                }

                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    }, new Response.ErrorListener() {

                        @Override
                        public void onErrorResponse(VolleyError error) {
                            // TODO: Handle error
                            System.out.println(error);
                        }
                    });
            QuizzerSingleton.getInstance(this).addToRequestQueue(jsonObjectRequest);
            QuizzerSingleton.getInstance(this).getRequestQueue().addRequestFinishedListener(new RequestQueue.RequestFinishedListener<JsonObjectRequest>() {

                @Override
                public void onRequestFinished(Request<JsonObjectRequest> request) {
                    ArrayList<Category> list = (ArrayList<Category>) QuizDbHelper.getInstance(getApplicationContext()).getAllCategories();
                    String diff = "";
                    String quest_diff = "";
                    for (int i = 0; i < 3; i++) {
                        switch (i) {
                            case 0:
                                diff = "easy";
                                quest_diff = Question.DIFFICULTY_EASY;
                                break;
                            case 1:
                                diff = "medium";
                                quest_diff = Question.DIFFICULTY_MEDIUM;
                                break;
                            case 2:
                                diff = "hard";
                                quest_diff = Question.DIFFICULTY_HARD;
                                break;
                        }
                        for (Category cat : list) {
                            String url = "https://opentdb.com/api.php?amount=10&category=" + cat.getId() + "&difficulty=" + diff + "&type=multiple";
                            String finalQuest_diff = quest_diff;
                            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                                    (Request.Method.GET, url, null, new Response.Listener<JSONObject>() {

                                        @Override
                                        public void onResponse(JSONObject response) {
                                            try {
                                                if ((int) response.get("response_code") == 0) {
                                                    JSONArray array = response.getJSONArray("results");
                                                    for (int j = 0; j < array.length(); j++) {
                                                        JSONObject obj = (JSONObject) array.get(j);
                                                        JSONArray answ = obj.getJSONArray("incorrect_answers");
                                                        Question question = new Question();
                                                        question.setCategoryID(cat.getId());
                                                        question.setQuestion(Jsoup.parse((String) obj.get("question")).text());
                                                        question.setOption1(Jsoup.parse((String) obj.get("correct_answer")).text());
                                                        question.setAnswerNr(1);
                                                        question.setDifficulty(finalQuest_diff);
                                                        for (int i = 0; i < answ.length(); i++) {
                                                            switch (i) {
                                                                case 0:
                                                                    question.setOption2(Jsoup.parse((String) answ.get(i)).text());
                                                                    break;
                                                                case 1:
                                                                    question.setOption3(Jsoup.parse((String) answ.get(i)).text());
                                                                    break;
                                                                case 2:
                                                                    question.setOption4(Jsoup.parse((String) answ.get(i)).text());
                                                                    break;
                                                                default:
                                                                    break;
                                                            }
                                                        }
                                                        question.shuffle();
                                                        QuizDbHelper.getInstance(getApplicationContext()).addQuestion(question);
                                                    }
                                                }
                                            } catch (JSONException e) {
                                                e.printStackTrace();
                                            }
                                        }
                                    }, new Response.ErrorListener() {

                                        @Override
                                        public void onErrorResponse(VolleyError error) {
                                            // TODO: Handle error
                                            System.out.println(error);
                                        }
                                    });
                            QuizzerSingleton.getInstance(getApplicationContext()).addToRequestQueue(jsonObjectRequest);
                        }
                    }
                }
            });
        }

        else{
            String diff = "";
            String quest_diff = "";
            for(Category c: QuizDbHelper.getInstance(this).getAllCategories()){
                for(int i = 0; i<3; i++){
                    switch (i){
                        case 0:
                            diff = "easy";
                            quest_diff = Question.DIFFICULTY_EASY;
                            break;
                        case 1:
                            diff = "medium";
                            quest_diff = Question.DIFFICULTY_MEDIUM;
                            break;
                        case 2:
                            diff = "hard";
                            quest_diff = Question.DIFFICULTY_HARD;
                            break;
                    }
                    if(QuizDbHelper.getInstance(this).getQuestions(c.getId(), quest_diff).size() == 0){
                        String url = "https://opentdb.com/api.php?amount=10&category=" + c.getId() + "&difficulty=" + diff + "&type=multiple";
                        String finalQuest_diff = quest_diff;
                        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                                (Request.Method.GET, url, null, new Response.Listener<JSONObject>() {

                                    @Override
                                    public void onResponse(JSONObject response) {
                                        try {
                                            if ((int) response.get("response_code") == 0) {
                                                JSONArray array = response.getJSONArray("results");
                                                for (int j = 0; j < array.length(); j++) {
                                                    JSONObject obj = (JSONObject) array.get(j);
                                                    JSONArray answ = obj.getJSONArray("incorrect_answers");
                                                    Question question = new Question();
                                                    question.setCategoryID(c.getId());
                                                    question.setQuestion(Jsoup.parse((String) obj.get("question")).text());
                                                    question.setOption1(Jsoup.parse((String) obj.get("correct_answer")).text());
                                                    question.setAnswerNr(1);
                                                    question.setDifficulty(finalQuest_diff);
                                                    for (int i = 0; i < answ.length(); i++) {
                                                        switch (i) {
                                                            case 0:
                                                                question.setOption2(Jsoup.parse((String) answ.get(i)).text());
                                                                break;
                                                            case 1:
                                                                question.setOption3(Jsoup.parse((String) answ.get(i)).text());
                                                                break;
                                                            case 2:
                                                                question.setOption4(Jsoup.parse((String) answ.get(i)).text());
                                                                break;
                                                            default:
                                                                break;
                                                        }
                                                    }
                                                    question.shuffle();
                                                    QuizDbHelper.getInstance(getApplicationContext()).addQuestion(question);
                                                }
                                            }
                                        } catch (JSONException e) {
                                            e.printStackTrace();
                                        }
                                    }
                                }, new Response.ErrorListener() {

                                    @Override
                                    public void onErrorResponse(VolleyError error) {
                                        // TODO: Handle error
                                        System.out.println(error);
                                    }
                                });
                        QuizzerSingleton.getInstance(getApplicationContext()).addToRequestQueue(jsonObjectRequest);
                    }
                }
            }
        }

    }

    // Called by the system when the device configuration changes while your component is running.
    // Overriding this method is totally optional!
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }

    // This is called when the overall system is running low on memory,
    // and would like actively running processes to tighten their belts.
    // Overriding this method is totally optional!
    @Override
    public void onLowMemory() {
        super.onLowMemory();
    }
}
