#include <stdlib.h>
#include <stdio.h>
#include <string.h>

//int modeval, input[7], total;
//double medianval;
void median(int *input, int total);
void mode(int *input, int total);

int partition(int *arr, int min, int max){
//  int temp;
  int pivot = arr[max];
  int i =(min-1);
  for(int j = min; j <= max; j++){
    if(arr[j] < pivot){
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  int temp = arr[i+1];
  arr[i+1] = arr[max];
  arr[max] = temp;
  return (i+1);
}

void quicksort(int *arr,int min,int max){
  if(min < max){
    int this = partition(arr,min,max);
    quicksort(arr,min,this-1);
    quicksort(arr,this+1,max);
  }
}
int compare(void *a, void *b){
  return (*(int*)a - *(int*)b);
}
int main(int argc, char const *argv[]) {
  if(argc != 2){
    printf("%s\n", "Unintended usage");
  }
  FILE *file;
//  char *filename = argv[1];
  file = fopen(argv[1], "r");
  int data, total = 0;
  if(file==NULL){
    fprintf(stderr, "File %s could not be opened\n", argv[1]);
    exit(1);
  }
//  int input[] = {412,324,2342,12,5,5,4,77,25};
//  int total = 9;
char bufr[100];
char *read;
int *input = NULL;
while(fgets(bufr,100,file)!=NULL){
  for(read=strtok(bufr," #");read!=NULL;read=strtok(NULL," #")){
//    total = atoi(read[0]);
//    bufr = total;
//  }
//     tmp=atoi(read);
//   }
//   printf("At %d: %d\n", z, tmp);
//   z++;
    while(fscanf(file,"%d",&data) != EOF){
//    if(data = (char)'#'){

//      printf("found #\n");
//    }
      ++total;
      input = (int*)realloc(input, total*sizeof(int));
      input[total-1] = data;
      printf("At %d: %d\n", (total-1), input[total-1]);
    }
  }
}
  // int *input = NULL;
  // while(fscanf(file,"%d",&data) != EOF){
  //   ++total;
  //   input = (int*)realloc(input, total*sizeof(int));
  //   input[total-1] = data;
  //   printf("At %d: %d\n", (total-1), input[total-1]);
  // }
  printf("Total elements read: %d\n", total);
  // for(int i = 0; i < total; i++){
  //   printf("pre-sort: %d\n", input[i]);
  // }
//  qsort_r(input, total, sizeof(int), compare);
//  int n = sizeof(input)/sizeof(input[0]);
  quicksort(input,0,total-1);
  for(int i = 0; i < total; i++){
     printf("post-sort: %d\n", input[i]);
  }
//  double medianval = median(input, total);
//  printf("The median is %lf\n", medianval);
//  int modeval = mode(input,total);
//  printf("The mode is %d\n", modeval);
  median(input,total);
  mode(input,total);
  fclose(file);
  return 0;
}
void mode(int *input, int total){
  // printf("In the mode function\n");
  int *tally = (int*)malloc(total*sizeof(int));
  int i,j;
  for(i=0;i < total;i++){
    for(j=0;j < total;j++){
      if(input[i]==input[j])
      tally[i]++;
    }
  }
  int modeval=0, count=0;
  for(i=1; i<=total; i++){
    if(tally[i] > count){
      count = tally[i];
      modeval = input[i];
    }
  }
//  return modeval;
  printf("The mode is %d. %d appeared %d times\n", modeval,modeval,count);
}
void median(int *input, int total){
  // printf("in the median function\n");
  // for(int i = 0; i < total; i++){
  //   printf("%d\n", input[i]);
  // }
  double temp = 0.0;
  if(total%2 == 0){
    temp = (input[total/2]+input[(total/2)-1])/2.0;
//    return temp;
  }
  else{
    temp = input[total/2];
//    return temp;
  }
  printf("The median is %.1f\n",temp);
//  return temp;
}
