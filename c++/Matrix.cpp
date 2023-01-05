//
// Created by Jasen LaBolle on 10/22/20.
//

#include <iostream>
#include "Matrix.h"

Matrix::Matrix(){
    for(int i = 0; i<3; i++){
        for(int j = 0; j<3; j++){
            int num = rand()%10+1;
            myArray[i][j] = num;
        }
    }
}

Matrix Matrix::operator*(const Matrix &b) {
    Matrix m;
    for(int i = 0; i<3; i++){
        for(int j = 0; j<3; j++){
            m.myArray[i][j] = 0;
        }
    }
    for(int i = 0; i<3; i++){
        for(int j = 0; j<3; j++){
            for(int k = 0; k<3; k++){
                m.myArray[i][j] += this->myArray[i][k] * b.myArray[k][j];
            }
        }
    }
    return m;
}

bool Matrix::operator==(const Matrix &b) {
    for(int i = 0; i<3; i++) {
        for (int j = 0; j < 3; j++) {
            if(this->myArray[i][j] != b.myArray[i][j]){
                return false;
            }
        }
    }
    return true;
}

string Matrix::toString() {
    string temp = "";
    for(int i = 0; i<3; i++) {
        for (int j = 0; j < 3; j++) {
            temp += std::to_string(myArray[i][j]);
            if(i != 2 || j != 2 ) {
                temp.append(", ");
            }
        }
        temp.append("\n");
    }
    return temp;
}