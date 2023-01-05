#include <iostream>
#include <time.h>
#include "Matrix.h"
//
// Created by Jasen LaBolle on 10/22/20.
//
int main() {
    srand(time(NULL));//seed for matrix creation.

    Matrix a; //make random matrix a
    Matrix b; // and matrix b
    Matrix c; // and matrix c, but we will se this to a*b later.

    cout<<a.toString()<<endl; //print a
    cout<<b.toString()<<endl; // print b

    c = a * b; //set c to a*b
    cout<<c.toString()<<endl; //print c

    if(a == b){ //test if a == b;
        cout<<"Matrix a is equal to Matrix b"<<endl;
    }
    else{
        cout<<"Matrix a is not equal to Matrix b"<<endl;
    }
    return 0;
}
