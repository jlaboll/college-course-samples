import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Time;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;

/**
 * solveClique.java
 * solveClique reads a file with adjacency matrices and solves for the maximum clique in each graph.
 *
 * @author Jasen LaBolle
 * Illinois State University
 * IT328 - 09/29/2020
 */
public class solveClique {
    //hold all the adjacency matrices.
    private static ArrayList<int[][]> adjMatrices;
    //hold filename.
    private static String file;

    //private class for solving graphs.
    private static class Graph {
        //vertex count, edge count, and time variable
        int countVert, e, time;
        //original vertex set, max clique set.
        ArrayList<Integer> origSet, clique;
        //set of sets containing all maximal cliques (which is sometimes different than a max clique)
        ArrayList<ArrayList<Integer>> maximalCliques;
        //local matrix.
        int[][] adjMatrix;
        //array holding the degree of each vertex.
        int[] vertexDegrees;

        /**
         * Saves the matrix.
         * counts the number of edges.
         * counts the degree of each vertex.
         * determines number of vertices.
         * creates objects. (ArrayLists)
         * @param adjMatrix the adjacency Matrix
         */
        public Graph(int[][] adjMatrix) {
            //matrix
            this.adjMatrix = adjMatrix;
            //initialize.
            e = 0;
            origSet = new ArrayList<>();
            maximalCliques = new ArrayList<>();
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

            //edge count is double here, so just divide by 2.
            e = e/2;
        }

        /**
         * run times the program while it is being solved.
         */
        public void run() {
            Date s = Time.from(Instant.now());
            BronKerbosh(new ArrayList<>(), origSet, new ArrayList<>());
            pickClique();
            Date f = Time.from(Instant.now());
            time = (int) (f.getTime() - s.getTime());
        }

        /**
         * Looks at all the maximalCliques and find the largest one.
         * If it find multiple it only will select the first one of that size.
         * This is important for printing the correct clique in toString.
         */
        private void pickClique(){
            int max = 0;
            for (ArrayList<Integer> C: maximalCliques){
                if(C.size() > max){
                    max = C.size();
                    C.sort(Integer::compareTo);
                    clique = C;
                }
            }
        }

        /**
         * A recursive implementation of the Bron-Kerbosh Algorithm based on pseudo code found on wikipedia.
         * This implementation utilizes pivots.
         * @param R The potential maximal clique
         * @param P The remaining vertices to explore.
         * @param X The exclusion set.
         */
        private void BronKerbosh(ArrayList<Integer> R, ArrayList<Integer> P, ArrayList<Integer> X){

            //If P and X are both empty then
            if(P.isEmpty() && X.isEmpty()){ // BASE CASE.
                //report R as a maximal clique
                maximalCliques.add(R);
            }
            else {
                //instance sets.
                ArrayList<Integer> PX, N, nN;

                //choose a pivot vertex u in P union X
                PX = getUnion(P, X);
                int pivot = PX.get(0);
                for (Integer v : PX) {
                    //pick the vertex with the highest degree.
                    if (vertexDegrees[v] > vertexDegrees[pivot]) {
                        pivot = v;
                    }
                }

                //build new lists for recursion
                N = getN(pivot); //get the pivots neighbors.
                nN = getNonN(P, N); //get the inverse of the neighbors.

                //for each vertex v in P \ N(u) do
                for (Integer v : nN) {
                    //get this vertex's neighbors.
                    N = getN(v);
                    //Recursive call.
                    BronKerbosh(
                            getUnion(R, getOneV(v)), //R union {v}
                            getIntersection(P, N), //P intersection N
                            getIntersection(X, N)); //X intersection N
                    P = getNonN(P, getOneV(v)); //Remove the vertex from P
                    X = getUnion(X, getOneV(v)); //And add it to X
                }
            }
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

        /**
         * toString
         * @return String
         */
        @Override
        public String toString() {
            StringBuilder sb = new StringBuilder();
            sb.append("(").append(countVert).append(", ").append(e).append(")  {");
            for (int i = 0; i < clique.size(); i++) {
                sb.append(clique.get(i));
                if (i + 1 != clique.size()) {
                    sb.append(", ");
                }
            }
            sb.append("} (size = ").append(clique.size()).append(", ").append(time).append("ms)\n");
            return sb.toString();
        }
    }

    /**
     * main statement.
     * Reads file, creates graphs, runs them, and prints results
     * @param args The file to read.
     */
    public static void main(String[] args) {
        adjMatrices = new ArrayList<>();
        ArrayList<Graph> graphs = new ArrayList<>();
        if (args.length != 1) {
            System.out.println("Incorrect Usage\nCorrect Usage: java solveClique <filename>");
            System.exit(1);
        }
        file = args[0];
        readFile();
        System.out.println("File Read.");
        for (int[][] i : adjMatrices) {
            graphs.add(new Graph(i));
        }
        System.out.printf("* Max Cliques in graphs in %s:\n", file);
        System.out.printf("\t(|V|,|E|)  Cliques (size, ms used)\n", file);
        for(Graph g: graphs) {
            g.run();
        }



        for (int i = 1; i < graphs.size()+1 ; i++) {
            System.out.println("G" + i + " " + graphs.get(i-1).toString());
        }
    }

    /**
     * Opens a file and calls readMatrix.
     */
    public static void readFile() {
        try {
            BufferedReader in = new BufferedReader(new FileReader(file));
            String line;
            while ((line = in.readLine()) != null) {
                int size = Integer.parseInt(line);
                readMatrix(in, size);
            }
        } catch (FileNotFoundException e) {
            System.out.println("File Not Found!");
            System.exit(1);
        } catch (IOException e) {
            System.out.println("Error while reading file.");
            System.exit(1);
        }
    }

    /**
     * Reads a matrix in, and adds it to the adjMatrices object.
     * @param br The buffered reader object
     * @param size The dimensions of the matrix to read.
     */
    public static void readMatrix(BufferedReader br, int size) {
        int[][] temp = new int[size][size];
        String line = "";
        for (int i = 0; i < size; i++) {
            try {
                line = br.readLine();
            } catch (IOException e) {
                System.out.println("Error while reading file.");
                System.exit(1);
            }
            String[] tokens = line.split("\\s");
            for (int j = 0; j < size; j++) {
                temp[i][j] = Integer.parseInt(tokens[j]);
            }
        }
        adjMatrices.add(temp);
    }
}
