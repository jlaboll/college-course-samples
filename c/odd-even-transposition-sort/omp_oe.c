#include <stdio.h>
#include <stdlib.h>
#include <omp.h>

int total;
int main(int argc, char const *argv[]) {
  int i, j, temp;
  int *a = NULL;
  FILE *file;
  file = fopen(argv[1], "r");
  if(file == NULL){
    printf("file didn't open\n");
    exit(0);
  }
  int data = 0;
  while(fscanf(file,"%d",&data) != EOF){
    ++total;
    a = (int*)realloc(a, total*sizeof(int));
    a[total-1] = data;
  }
  printf("unsorted list\n");
//  for(i=0;i<total;i++){
//    printf("%d\n",a[i]);
//  }
  for(i=0;i<total;i++){
    if(i%2==0){
      #pragma omp parallel for private(temp,j)shared(a)
      for(j=0;j<total-1;j+=2){
        if(a[j] > a[j+1]){
          temp = a[j];
          a[j] = a[j+1];
          a[j+1] = temp;
        }
      }
    }
    else{
      #pragma omp parallel for private(temp,j)shared(a)
      for(j=1;j<total-1;j+=2){
        if(a[j] > a[j+1]){
          temp = a[j];
          a[j] = a[j+1];
          a[j+1] = temp;
        }
      }
    }
  }
  printf("Sorted list\n");
  for(i = 0;i<total;i++){
    printf("%d\n",a[i]);
  }
  return 0;
}
