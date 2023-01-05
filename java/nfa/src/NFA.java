import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class NFA {
    private static Finite_Alphabet_Determinate dfa;
    private static Finite_Alphabet_Non_Determinate nfa;

    public static class Finite_Alphabet_Determinate {
        ArrayList<Character> sigma;
        ArrayList<Integer> accept_states;
        int init_state;
        ArrayList<ArrayList<Integer>> states;

        public Finite_Alphabet_Determinate() {
            sigma = new ArrayList<>();
            accept_states = new ArrayList<>();
            states = new ArrayList<>();
        }

        public boolean testString(String line) {
            int result = stateChange(line, 0, init_state);
            return accept_states.contains(result);
        }

        public int stateChange(String line, int index, int last_state) {
            if (index >= line.length()) {
                return last_state;
            } else {
                if (sigma.contains(line.charAt(index))) {
                    return stateChange(line, index + 1, states.get(last_state).get(sigma.indexOf(line.charAt(index))));
                } else {
                    return -1;
                }
            }
        }

        public String toString() {
            StringBuilder sb = new StringBuilder();
            sb.append("To DFA:\n");
            sb.append(" Sigma:\t");
            for (char c : sigma) {
                sb.append(c).append('\t');
            }
            sb.append("\n------\n");
            for (int i = 0; i < states.size(); i++) {
                sb.append('\t').append(i).append(":\t");
                for (int t = 0; t < states.get(i).size(); t++) {
                    sb.append(states.get(i).get(t));
                    sb.append("\t");
                }
                sb.append("\n");
            }
            sb.append("------\n");
            sb.append(init_state).append(":\tInitial State\n");
            for (int i = 0; i < accept_states.size(); i++) {
                sb.append(accept_states.get(i));
                if (accept_states.size() > 1 && i + 1 < accept_states.size()) {
                    sb.append(", ");
                }
            }
            sb.append(":\tAccepting State(s)\n");
            return sb.toString();
        }
    }

    private static class Finite_Alphabet_Non_Determinate {
        ArrayList<Character> sigma;
        ArrayList<Integer> accept_states;
        int init_state;
        ArrayList<ArrayList<ArrayList<Integer>>> states;
        ArrayList<ArrayList<Integer>> dfaStates;

        public Finite_Alphabet_Non_Determinate() {
            sigma = new ArrayList<>();
            accept_states = new ArrayList<>();
            states = new ArrayList<>();
            dfaStates = new ArrayList<>();
        }

        public void toDFA() {
            ArrayList<ArrayList<ArrayList<Integer>>> allDFA = new ArrayList<>();
            ArrayList<Integer> first = new ArrayList<>();
            first.add(init_state);
            first.addAll(states.get(init_state).get(states.get(init_state).size() - 1));
            first.sort(Integer::compareTo);
            dfaStates.add(first);
            allDFA = method2(allDFA, 0);

            for (ArrayList<ArrayList<Integer>> lists : allDFA) {
                ArrayList<Integer> sigmaDFAState = new ArrayList<>();
                for (ArrayList<Integer> list : lists) {
                    sigmaDFAState.add(getIndex(list));
                }
                dfa.states.add(sigmaDFAState);
            }
            for (ArrayList<Integer> list : dfaStates) {
                for (Integer i : accept_states) {
                    if (list.contains(i)) {
                        dfa.accept_states.add(dfaStates.indexOf(list));
                    }
                }
            }
            dfa.sigma = sigma;
            dfa.init_state = 0;
        }

        private Integer getIndex(ArrayList<Integer> list) {
            for (ArrayList<Integer> list1 : dfaStates) {
                if (compareStateSets(list, list1)) {
                    return dfaStates.indexOf(list);
                }
            }
            return 0;
        }

        public ArrayList<ArrayList<ArrayList<Integer>>> method2(ArrayList<ArrayList<ArrayList<Integer>>> allDFA, int index) {
            if (index >= dfaStates.size()) {
                return allDFA;
            } else {
                allDFA.add(method(dfaStates.get(index)));
                for (ArrayList<Integer> list2 : allDFA.get(allDFA.size() - 1)) {
                    if (!dfaStates.contains(list2)) {
                        dfaStates.add(list2);
                    }
                }
                return method2(allDFA, index + 1);
            }
        }

        public ArrayList<ArrayList<Integer>> method(ArrayList<Integer> list) {
            ArrayList<ArrayList<Integer>> temp = new ArrayList<>();
            for (char c : sigma) {
                temp.add(buildSet(c, list));
            }
            return temp;
        }


        public ArrayList<Integer> buildSet(char sigmaChar, ArrayList<Integer> fromSet) {
            ArrayList<Integer> temp = new ArrayList<>();
            for (Integer i : fromSet) {
                for (Integer j : states.get(i).get(sigma.indexOf(sigmaChar))) {
                    if (!temp.contains(j)) {
                        temp.add(j);
                    }
                }
            }
            ArrayList<Integer> temp2 = new ArrayList<>(temp);
            boolean added;
            do {
                added = false;
                temp.addAll(temp2);
                for (Integer i : temp) {
                    for (Integer j : states.get(i).get(states.get(i).size() - 1)) {
                        if (!temp2.contains(j)) {
                            temp2.add(j);
                            added = true;
                        }
                    }
                }
            } while (added);
            temp2.sort(Integer::compareTo);
            return temp2;
        }

        public boolean compareStateSets(ArrayList<Integer> a, ArrayList<Integer> b) {
            for (Integer i : a) {
                if (!b.contains(i)) {
                    return false;
                }
            }
            return true;
        }

        public String toString() {
            StringBuilder sb = new StringBuilder();
            sb.append("Sigma:");
            for (char c : sigma) {
                sb.append(c).append(' ');
            }
            sb.append("\n------\n");
            for (int i = 0; i < states.size(); i++) {
                sb.append(i).append(":\t");
                for (int t = 0; t < states.get(i).size(); t++) {
                    sb.append("(");
                    if (t < states.get(i).size() - 1) {
                        sb.append(sigma.get(t)).append(",{");
                    } else {
                        sb.append(" ,{");
                    }
                    for (int j = 0; j < states.get(i).get(t).size(); j++) {
                        sb.append(states.get(i).get(t).get(j));
                        if (states.get(i).get(t).size() > 1 && j + 1 < states.get(i).get(t).size()) {
                            sb.append(',');
                        }
                    }
                    sb.append("}) ");
                }
                sb.append("\n");
            }
            sb.append("------\n");
            sb.append(init_state).append(":\tInitial State\n");
            for (int i = 0; i < accept_states.size(); i++) {
                sb.append(accept_states.get(i));
                if (accept_states.size() > 1 && i + 1 < accept_states.size()) {
                    sb.append(", ");
                }
            }
            sb.append(":\tAccepting State(s)\n");
            return sb.toString();
        }
    }

    public static void main(String[] args) {
        if (args.length != 2) {
            System.out.println("Incorrect Usage.");
            System.out.println("$ java NFA <nfa_filename> <string_textfile>");
            System.exit(1);
        }
        nfa = new Finite_Alphabet_Non_Determinate();
        dfa = new Finite_Alphabet_Determinate();
        readNFA(args[0]);
        System.out.println(nfa.toString());
        nfa.toDFA();
        System.out.println(dfa.toString());
        readText(args[1]);
    }

    public static void readNFA(String nfaFile) {
        try {
            BufferedReader br = new BufferedReader(new FileReader(nfaFile));
            int numStates = Integer.parseInt(br.readLine());
            String line = br.readLine();
            String[] tokens = line.split("\\s");

            for (String token : tokens) {
                if (token.length() > 0) {
                    nfa.sigma.add(token.charAt(0));
                }
            }


            for (int j = 0; j < numStates; j++) {
                ArrayList<ArrayList<Integer>> stateSets = new ArrayList<>(); // Reading and storing state changes
                ArrayList<ArrayList<Integer>> tuples = new ArrayList<>();
                String set;
                line = br.readLine();
                for (int i = 0; i < nfa.sigma.size() + 1; i++) {
                    line = line.substring(line.indexOf('{'));
                    set = line.substring(0, line.indexOf('}'));
                    tokens = set.split("\\{");
                    ArrayList<Integer> temp = new ArrayList<>(1);
                    for (String s : tokens) {
                        if (s.length() > 0) {
                            temp.add(Integer.parseInt(s));
                        }
                    }
                    stateSets.add(temp);
                    line = line.substring(line.indexOf('}'));
                }
                for (int i = 0; i < nfa.sigma.size(); i++) { // Adding state changes to nfa
                    tuples.add(stateSets.get(i));
                }
                tuples.add(stateSets.get(nfa.sigma.size()));
                nfa.states.add(tuples);
            }

            nfa.init_state = Integer.parseInt(br.readLine());
            line = br.readLine();
            line = line.replace('{', ' ');
            line = line.replace(',', ' ');
            line = line.replace('}', ' ');
            tokens = line.split("\\s");
            for (String s : tokens) {
                if (s.length() > 0) {
                    nfa.accept_states.add(Integer.parseInt(s));

                }
            }
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void readText(String textFile) {
        try {
            BufferedReader br = new BufferedReader(new FileReader(textFile));
            String line;
            int count = 0;
            System.out.printf("Parsing Results of strings in %s:\n", textFile);
            while (br.ready()) {
                line = br.readLine();
                count++;
                if (dfa.testString(line)) {
                    System.out.print("Yes\t");
                } else {
                    System.out.print("No\t");
                }
                if ((count % 15) == 0) {
                    System.out.print("\n");
                }

            }
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
