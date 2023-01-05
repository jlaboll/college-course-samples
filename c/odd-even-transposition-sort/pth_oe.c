#include <stdlib.h>
#include <stdio.h>
#include <pthread.h>
#include <string.h>



void oddEven(pthread_t[]);
void* func(void* args);
int *input;
int tmp;
int total = 0;
int count;
int main(int argc, char const *argv[]) {
  if(argc != 2){
    printf("%s\n", "Unintended usage");
    argv[1]="test.txt";
  }
  FILE *file;
  file = fopen(argv[1], "r");
  int data = 0;
  if(file==NULL){
    fprintf(stderr, "File %s could not be opened\n", argv[1]);
    exit(1);
  }
  while(fscanf(file,"%d",&data) != EOF){
    ++total;
    input = (int*)realloc(input, total*sizeof(int));
    input[total-1] = data;
  }
  count = (total+1)/2;
  printf("Unsorted: \n");
  for(int z = 0; z < total; z++){
    printf("%d\n", input[z]);
  }
  pthread_t threads[count];
  oddEven(threads);
  printf("Sorted: \n");
  for(int z = 0; z<total;z++){
    printf("%d\n",input[z]);
  }
  return 0;
}

void oddEven(pthread_t threads[]){
//  printf("thread count: %d\n",count);
  int i,j;
  for(i=1;i<=total;i++){
    if(i%2==1){
      tmp = 0;
      for(j=0;j<count;j++) pthread_create(&threads[j],NULL,func,NULL);
      for(j=0;j<count;j++) pthread_join(threads[j],NULL);
    }
    else{
      tmp = 1;
      for(j=0;j<count-1;j++) pthread_create(&threads[j],NULL,func,NULL);
      for(j=0;j<count-1;j++) pthread_join(threads[j],NULL);
    }
  }
}

void* func(void* arg){
//  printf("tmp: %d\n", tmp);
  int index = tmp;
  tmp = tmp + 2;
  if((input[index] > input[index+1]) && (index + 1 < total)){
    int alpha = input[index];
    input[index] = input[index+1];
    input[index+1] = alpha;
  }
}
