package com.example.quizzer;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;

import java.util.ArrayList;


public class MainActivity extends AppCompatActivity {
    public static final String SHARED_PREFS = "sharedPrefs";
    public static final String KEY_HIGHSCORE = "keyHighscore";
    public static final String EXTRA_CATEGORY_ID = "extraCategoryID";
    public static final String EXTRA_CATEGORY_NAME = "extraCategoryName";
    public static final String EXTRA_DIFFICULTY = "extraDifficulty";
    private static final int REQUEST_CODE_QUIZ = 1;
    private TextView textViewHighscore;
    private TextView textViewLoading;
    private Spinner spinnerDifficulty;
    private Spinner spinnerCategory;
    private int highscore;
    private ArrayList<Category> categoryArrayList;
    private ArrayAdapter<Category> adapterCategories;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textViewLoading = findViewById(R.id.loading_text);
        textViewHighscore = findViewById(R.id.score);
        spinnerDifficulty = findViewById(R.id.spinner_difficulty);
        spinnerCategory = findViewById(R.id.spinner_category);
        Button buttonStartQuiz = findViewById(R.id.start_button);
        Button buttonRefresh = findViewById(R.id.refesh_button);

        loadCategories();
        loadDifficultyLevels();
        loadHighscore();


        spinnerCategory.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener(){
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                String difficulty = spinnerDifficulty.getSelectedItem().toString();
                Category selectedCategory = (Category) spinnerCategory.getSelectedItem();
                if(QuizDbHelper.getInstance(getApplicationContext()).getQuestions(selectedCategory.getId(), difficulty).size() == 0){
                    buttonStartQuiz.setEnabled(false);
                    buttonStartQuiz.setText(R.string.no_qiuz_message);
                }
                else{
                    buttonStartQuiz.setEnabled(true);
                    buttonStartQuiz.setText(R.string.start_quiz);
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {
                buttonStartQuiz.setEnabled(false);
                buttonStartQuiz.setText(R.string.no_qiuz_message);
            }
        });

        buttonStartQuiz.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startQuiz();
            }
        });
        buttonRefresh.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                update((ArrayList<Category>) QuizDbHelper.getInstance(getApplicationContext()).getAllCategories());
            }
        });
        QuizzerSingleton.getInstance(this.getApplicationContext()).getRequestQueue().addRequestFinishedListener(new RequestQueue.RequestFinishedListener<JsonObjectRequest>() {
            @Override
            public void onRequestFinished(Request<JsonObjectRequest> request) {
            System.out.println(QuizzerSingleton.getInstance(getApplicationContext()).getRequestQueue().getSequenceNumber());
            }
        });
    }


    private void startQuiz() {
        Category selectedCategory = (Category) spinnerCategory.getSelectedItem();
        int categoryID = selectedCategory.getId();
        String categoryName = selectedCategory.getName();
        String difficulty = spinnerDifficulty.getSelectedItem().toString();
        Intent intent = new Intent(this, QuizActivity.class);
        intent.putExtra(EXTRA_CATEGORY_ID, categoryID);
        intent.putExtra(EXTRA_CATEGORY_NAME, categoryName);
        intent.putExtra(EXTRA_DIFFICULTY, difficulty);
        startActivityForResult(intent, REQUEST_CODE_QUIZ);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_QUIZ) {
            if (resultCode == RESULT_OK) {
                int score = data.getIntExtra(QuizActivity.EXTRA_SCORE, 0);
                if (score > highscore) {
                    updateHighscore(score);
                }
            }
        }
    }
    public void update(ArrayList<Category> filtersList) {
        if (filtersList != null) {
            this.categoryArrayList.clear();
            this.categoryArrayList.addAll(filtersList);
            adapterCategories.notifyDataSetChanged();
            spinnerCategory.setSelection(0);
        }
    }
    private void loadCategories() {
        QuizDbHelper dbHelper = QuizDbHelper.getInstance(this.getApplicationContext());
        categoryArrayList = (ArrayList<Category>) dbHelper.getAllCategories();
        adapterCategories = new ArrayAdapter<Category>(this,
                android.R.layout.simple_spinner_item, categoryArrayList);
        adapterCategories.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerCategory.setAdapter(adapterCategories);
    }

    private void loadDifficultyLevels() {
        String[] difficultyLevels = Question.getAllDifficultyLevels();
        ArrayAdapter<String> adapterDifficulty = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, difficultyLevels);
        adapterDifficulty.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerDifficulty.setAdapter(adapterDifficulty);
    }
    private void loadHighscore() {
        SharedPreferences prefs = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        highscore = prefs.getInt(KEY_HIGHSCORE, 0);
        textViewHighscore.setText("Highscore: " + highscore);
    }
    private void updateHighscore(int highscoreNew) {
        highscore = highscoreNew;
        textViewHighscore.setText("Highscore: " + highscore);
        SharedPreferences prefs = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putInt(KEY_HIGHSCORE, highscore);
        editor.apply();
    }
}