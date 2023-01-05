#include <stdlib.h>
#include <stdio.h>
#include <pthread.h>
#include <string.h>
//int modeval, input[7], total;
//double medianval;
void median(int *input, int total);
void mode(int *input, int total);
int partition(int *arr, int min, int max);
void quicksort(int *arr,int min, int max);
void merge(int *semisorted, int *sorted, int threads, int length);
void* func(void* args);
#define LENGTH(x) (sizeof(x)/sizeof(x[0]))
pthread_mutex_t mutex;
int count = 6;
int total = 0;
int local;
int *input = NULL;
int *semisorted = NULL;
int *sorted = NULL;
typedef struct param{
    int low;
    int high;
    int rank;
    // int range;
}param;

int compare(void *a, void *b, void *c){
  return (*(int*)a - *(int*)b);
}


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
  pthread_t tid[count]; /* the thread identifier */
  pthread_mutex_init(&mutex,NULL);
  char bufr[100];
  char *read;
  while(fgets(bufr,100,file)!=NULL){
    for(read=strtok(bufr," #");read!=NULL;read=strtok(NULL," #")){
      while(fscanf(file,"%d",&data) != EOF){
        ++total;
        input = (int*)realloc(input, total*sizeof(int));
        input[total-1] = data;
      }
    }
  }
  semisorted = (int*)malloc(total*sizeof(int));
  sorted = (int*)malloc(total*sizeof(int));
  int local = total/count;
  long i;
  for(i = 0; i < count; i++){
    pthread_create(&tid[i],NULL,func,(void*)i);
  }
  for(i = 0; i < count; i++){
    pthread_join(tid[i],NULL);
  }

  merge(semisorted,sorted,count,total);
  for(i = 0; i < total;i++){
    printf("%d\n",sorted[i]);
  }
  median(sorted,total);
  mode(sorted,total);
  fclose(file);
  return 0;
}
void mode(int *input, int total){
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
  printf("The mode is %d. %d appeared %d times\n", modeval,modeval,count);
}
void median(int *input, int total){
  double temp = 0.0;
  if(total%2 == 0){
    temp = (input[total/2]+input[(total/2)-1])/2.0;
  }
  else{
    temp = input[total/2];
  }
  printf("The median is %.1f\n",temp);
}

int partition(int *arr, int min, int max){
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
void* func(void* thread){
  long myrank = (long)thread;
  long i;
  long local = total/count;
  long my_first_i = myrank*local;
  long my_last_i = my_first_i+local;
  if(myrank == count-1){
    my_last_i += total%count;
  }
  int *p = (int*)malloc(total*sizeof(int)); //local array
  int j = 0;
  int temp;
  for(i = my_first_i; i < my_last_i;i++){
    p[i] = input[i];
  }
  quicksort(p, my_first_i,my_last_i-1);
  for(i = my_first_i; i < my_last_i;i++){
    semisorted[i]=p[i];
  }
  pthread_exit(0);
  return NULL;
}
void fill(int *start, int *end,int segments, int length){
  int i;
  for(i = 0; i<segments; i++){
    start[i] = ((length/segments)*i);
    if(i<(segments - 1)) end[i] = ((length/segments)*(i+1));
    else end[i] = length;
  }
}
void merge(int *input, int *sorted, int segments, int length){
  int local = (length/segments);
  int start[segments];
  int end[segments];
  fill(start,end,segments,length);
  int i;
  for(i=0;i<length;i++){
    int j;
    int lowest = -1;
    for(j=0;j<LENGTH(start);j++){
      if(start[j] >= end[j]) continue;
      if((lowest == -1)||input[start[j]] <= input[start[lowest]]) lowest = j;
    }
    sorted[i] = input[start[lowest]];
    start[lowest] += 1;
  }

}
