import com.sun.org.apache.bcel.internal.generic.NEW;

import java.io.*;
import java.sql.Time;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class solve3CNF {
    private static ArrayList<Graph> graphs;
    private static String file;



//private class for solving graphs.
        private static class Graph {
            //vertex count, edge count, and time variable
            int countVert, e, time, k, n;
            boolean stop;
            //original vertex set, max clique set.
            ArrayList<Integer> origSet, clique;
            //local matrix.
            int[][] adjMatrix;
            //array holding the degree of each vertex.
            int[] vertexDegrees, vertexVals;

            /**
             * Saves the matrix.
             * counts the number of edges.
             * counts the degree of each vertex.
             * determines number of vertices.
             * creates objects. (ArrayLists)
             * @param adjMatrix the adjacency Matrix
             */
            public Graph(int[][] adjMatrix, int k, int n, int[] vertexVals) {
                this.vertexVals = vertexVals;
                this.k = k;
                this.n = n;
                //matrix
                this.adjMatrix = adjMatrix;
                //initialize.
                origSet = new ArrayList<>();
                clique = new ArrayList<>();
                countVert = adjMatrix.length;
                vertexDegrees = new int[adjMatrix.length];

                //double for to count edges and degree.
                for (int i = 0; i < adjMatrix.length; i++) {
                    vertexDegrees[i] = 0;
                    origSet.add(i);
                    for (int j = 0; j < adjMatrix[i].length; j++) {
                        vertexDegrees[i] += adjMatrix[i][j];
                    }
                    vertexDegrees[i] --;
                    e+= vertexDegrees[i];
                }
                e=e/2;
                stop = true;
            }

            /**
             * run times the program while it is being solved.
             */
            public void run() {
                Date s = Time.from(Instant.now());
                cliqueBuilder(new ArrayList<>(), buildKSets(), 0);
                Date f = Time.from(Instant.now());
                time = (int) (f.getTime() - s.getTime());
            }

            private ArrayList<ArrayList<Integer>> buildKSets(){
                ArrayList<ArrayList<Integer>> clauses = new ArrayList<>();
                int count = 0;
                ArrayList<Integer> clause = new ArrayList<>();
                for(int i:origSet){
                    clause.add(i);
                    count ++;
                    if(count%3 == 0){
                        clauses.add(clause);
                        clause = new ArrayList<>();
                    }
                }
                return clauses;
            }

            private void cliqueBuilder(ArrayList<Integer> R, ArrayList<ArrayList<Integer>> clauses, int index){
                if(index == clauses.size()){
                    if(R.size() == k){
                        clique = R;
                        stop = false;
                    }
                }
                else{
                    if(stop) {
                        ArrayList<Integer> temp = clauses.get(index);
                        for (int i : temp) {
                            if (checkN(R, i)) {
                                cliqueBuilder(getUnion(R, getOneV(i)), clauses, index + 1);
                            }
                        }
                    }
                }
            }

            private boolean checkN(ArrayList<Integer> R, int check){
                for(int i:R){
                    if(adjMatrix[check][i] == 0){
                        return false;
                    }
                }
                return true;
            }
            /**
             * getOneV returns a set with one element.
             * @param i element.
             * @return ArrayList the new set.
             */
            private ArrayList<Integer> getOneV(int i){
                ArrayList<Integer> L = new ArrayList<>();
                L.add(i);
                return L;
            }

            /**
             * getNonN gets the inverse of the set P union N of some vertex from set P
             * @param P A set of numbers
             * @param N A set of numbers to remove from P
             * @return ArrayList the Non-Neighborhood for a vertex with neighborhood N
             */
            private ArrayList<Integer> getNonN(ArrayList<Integer> P, ArrayList<Integer> N){
                ArrayList<Integer> nN= new ArrayList<>();
                for(int v:P){
                    if(!N.contains(v)){
                        nN.add(v);
                    }
                }
                return nN;
            }

            /**
             * getUnion unions 2 sets
             * @param A The first set
             * @param B The second set
             * @return ArrayList A union B
             */
            private ArrayList<Integer> getUnion(ArrayList<Integer> A, ArrayList<Integer> B){
                ArrayList<Integer> C = new ArrayList<>(A);
                for(int v2:B) {
                    if (!C.contains(v2)) {
                        C.add(v2);
                    }
                }
                return C;
            }

            /**
             * getIntersection returns the intersection of 2 sets.
             * @param A The first set
             * @param B The second set
             * @return ArrayList A intersect B
             */
            private ArrayList<Integer> getIntersection(ArrayList<Integer> A, ArrayList<Integer> B){
                ArrayList<Integer> C= new ArrayList<>();
                for(int v:A){
                    if(B.contains(v)){
                        C.add(v);
                    }
                }
                return C;
            }

            /**
             * getN returns the Neighborhood of a vertex
             * @param vertex the vertex
             * @return ArrayList the neighborhood of vertex
             */
            private ArrayList<Integer> getN(int vertex){
                ArrayList<Integer> N = new ArrayList<>();
                for(int v = 0; v<adjMatrix.length; v++){
                    if(adjMatrix[vertex][v] == 1 && v!=vertex){
                        N.add(v);
                    }
                }
                return N;
            }

            private String toBoolAsg(){
                ArrayList<Integer> solutionTrue = new ArrayList<>(), solutionFalse = new ArrayList<>(), parse = new ArrayList<>();
                for(int i: clique){
                    parse.add(vertexVals[i]);
                }
                parse.sort(Integer::compareTo);
                for(int i: parse){
                    if(i > 0) {
                        if (!solutionTrue.contains(i)) {
                            solutionTrue.add(i);
                        }
                    }
                    else{
                        if (!solutionFalse.contains(i)) {
                            solutionFalse.add(i);
                        }
                    }
                }

                StringBuilder sb = new StringBuilder();
                for(int i = 1; i<=n; i++){
                    if(!solutionTrue.isEmpty()&&solutionTrue.get(0) == i) {
                            sb.append("T,");
                            solutionTrue.remove(0);

                    }
                    else if(!solutionFalse.isEmpty() && solutionFalse.get(0) == -i){
                        sb.append("F,");
                        solutionFalse.remove(0);
                    }
                    else{
                        sb.append("X,");
                    }
                }
                sb.deleteCharAt(sb.length()-1);
                return sb.toString();
            }

            /**
             * toString
             * @return String
             */
            @Override
            public String toString() {
                StringBuilder sb = new StringBuilder();
                sb.append("[n=").append(n).append(" k=").append(k).append("] ");
                if(clique.size() > 0) {
                    sb.append(toBoolAsg());
                }
                else{
                    sb.append(String.format("No %d-clique; No solution.", k));
                }
                sb.append(" (").append(time).append("ms)\n");
                return sb.toString();
            }
        }


    /**
     * main statement.
     * Reads file, creates graphs, runs them, and prints results
     * @param args The file to read.
     */
    public static void main(String[] args) {
        graphs = new ArrayList<>();
        if (args.length != 1) {
            System.out.println("Incorrect Usage\nCorrect Usage: java solveClique <filename>");
            System.exit(1);
        }
        file = args[0];
        readFile();
        System.out.println("File Read.");

        for(Graph g: graphs) {
            g.run();
        }

        System.out.printf("* Solve 3CNF in %s: (reduced to K-Clique)\n", file);
        System.out.println("\t\tx: can be either T or F (ms used)");
        for (int i = 1; i < graphs.size()+1 ; i++) {
            System.out.println("3CNF No." + i + ": " + graphs.get(i-1).toString());
        }
    }

    public static void toMatrix(String line){
        int[][] matrix;
        int n, k;
        String[] tokens = line.split("\\s");

        n = Integer.parseInt(tokens[0]);
        k = (tokens.length -1)/3;
        int[] vertex;

        vertex = new int[k*3];

        for(int i = 1; i<tokens.length; i++){
            vertex[i-1] = Integer.parseInt(tokens[i]);
        }

        matrix = new int[k*3][k*3];


        for(int i = 0; i<vertex.length; i++){
            for(int j = 0; j<vertex.length; j++){
                    if(vertex[j] == -(vertex[i])){
                        matrix[i][j] = 0;
                    }
                    else matrix[i][j] = 1;
            }
        }
        for(int i = 0; i<k; i++){
            for(int j = 0; j<3; j++){
                for(int x = 0; x<3; x++){
                    if(j == x) {
                        matrix[(i * 3) + j][(i * 3) + x] = 1;
                    }
                    else matrix[(i * 3) + j][(i * 3) + x] = 0;
                }
            }
        }
        graphs.add(new Graph(matrix, k, n, vertex));
    }

    /**
     * Opens a file and calls readMatrix.
     */
    public static void readFile() {
        try {
            BufferedReader in = new BufferedReader(new FileReader(file));
            String line;
            while ((line = in.readLine()) != null) {
                toMatrix(line);
            }
        } catch (FileNotFoundException e) {
            System.out.println("File Not Found!");
            System.exit(1);
        } catch (IOException e) {
            System.out.println("Error while reading file.");
            System.exit(1);
        }
    }


}
