package com.example.quizzer;


import android.os.Parcel;
import android.os.Parcelable;

import java.util.Random;

public class Question implements Parcelable {
    public static final String DIFFICULTY_EASY = "Easy";
    public static final String DIFFICULTY_MEDIUM = "Medium";
    public static final String DIFFICULTY_HARD = "Hard";
    public static final Creator<Question> CREATOR = new Creator<Question>() {
        @Override
        public Question createFromParcel(Parcel in) {
            return new Question(in);
        }

        @Override
        public Question[] newArray(int size) {
            return new Question[size];
        }
    };
    private String question;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private int answerNr;
    private String difficulty;
    private int categoryID;

    public Question() {
    }

    public Question(String question, String option1, String option2,
                    String option3, String option4, int answerNr, String difficulty, int categoryID) {
        this.question = question;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.answerNr = answerNr;
        this.difficulty = difficulty;
        this.categoryID = categoryID;
    }

    protected Question(Parcel in) {
        question = in.readString();
        option1 = in.readString();
        option2 = in.readString();
        option3 = in.readString();
        option4 = in.readString();
        answerNr = in.readInt();
        difficulty = in.readString();
        categoryID = in.readInt();
    }

    public static String[] getAllDifficultyLevels() {
        return new String[]{
                DIFFICULTY_EASY,
                DIFFICULTY_MEDIUM,
                DIFFICULTY_HARD
        };
    }

    public void shuffle(){
        Random rand = new Random(System.currentTimeMillis());
        int i = rand.nextInt(4) + 1;
        while( i == answerNr){
            i = rand.nextInt(4) + 1;
        }
        String opt, optRand;
        switch (answerNr){
            case 1:
                opt = getOption1();
                break;
            case 2:
                opt = getOption2();
                break;
            case 3:
                opt = getOption3();
                break;
            case 4:
                opt = getOption4();
                break;
            default:
                opt = getOption1();
                break;
        }
        switch (i){
            case 1:
                optRand = getOption1();
                setOption1(opt);
                break;
            case 2:
                optRand = getOption2();
                setOption2(opt);
                break;
            case 3:
                optRand = getOption3();
                setOption3(opt);
                break;
            case 4:
                optRand = getOption4();
                setOption4(opt);
                break;
            default:
                optRand = getOption3();
                setOption4(opt);
                break;
        }
        switch (answerNr){
            case 1:
                setOption1(optRand);
                break;
            case 2:
                setOption2(optRand);
                break;
            case 3:
                setOption3(optRand);
                break;
            case 4:
                setOption4(optRand);
                break;
            default:
                setOption1(optRand);
                break;
        }
        answerNr = i;
    }



    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(question);
        dest.writeString(option1);
        dest.writeString(option2);
        dest.writeString(option3);
        dest.writeString(option4);
        dest.writeInt(answerNr);
        dest.writeString(difficulty);
        dest.writeInt(categoryID);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getOption1() {
        return option1;
    }

    public void setOption1(String option1) {
        this.option1 = option1;
    }

    public String getOption2() {
        return option2;
    }

    public void setOption2(String option2) {
        this.option2 = option2;
    }

    public String getOption3() {
        return option3;
    }

    public void setOption3(String option3) {
        this.option3 = option3;
    }

    public String getOption4() {
        return option4;
    }

    public void setOption4(String option4) {
        this.option4 = option4;
    }

    public int getAnswerNr() {
        return answerNr;
    }

    public void setAnswerNr(int answerNr) {
        this.answerNr = answerNr;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }


    public int getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(int categoryID) {
        this.categoryID = categoryID;
    }
}