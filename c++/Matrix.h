//
// Created by Jasen LaBolle on 10/22/20.
//

#ifndef ASG1_MATRIX_H
#define ASG1_MATRIX_H


#include <string>
using namespace std;
class Matrix {
private:
    int myArray[3][3];
public:
    Matrix();
    Matrix operator*(const Matrix& b);
    bool operator==(const Matrix& b);

    string toString();
};


#endif //ASG1_MATRIX_H
