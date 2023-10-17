package game;
/*import java.io.BufferedReader;
import java.io.FileReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
*/

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

public class Storage {

    //Baptiste
    public static final Storage INSTANCE = new Storage("fichiersTexte/grid.txt", "fichiersTexte/nbGrille.txt");
    //Tino
    //public static final Storage INSTANCE = new Storage("game\\game-backend\\src\\main\\java\\game\\grid.txt", "game\\game-backend\\src\\main\\java\\game\\nbGrille.txt");

    private final String pathG;
    private final String pathN;

    public List<String> difficultes = List.of("easy","medium","hard","very-hard","insane","inhuman");

    private Storage(String s1, String s2){
       pathG = s1;
       pathN = s2;
    }

    //enregistre la grille sous forme de string dans le fichier texte grid de la manière suivante : "difficulté!id!grille!...scores"
    public void predefinedGridRegister(String grid, String dif) throws IOException, URISyntaxException{
        Path path = Paths.get(getClass().getClassLoader().getResource(this.pathG).toURI());
        //Path path = Paths.get(this.pathG);
        List<String> grids = Files.readAllLines(path);
        this.metAJourNbGrille(this.difficultes.indexOf(dif));
        int id_grille = getNbGrilleDif(this.difficultes.indexOf(dif));
        String idgrid = id_grille+"";
        String grid2 = grid.substring(1, grid.length()-1);
        String grille = dif + "!" + idgrid+"!"+ grid2+"!";
        grids.add(grille);
        Files.write(path, grids);
    }

    public String getGrid(String dif) throws IOException, URISyntaxException{
        Path path1 = Paths.get(getClass().getClassLoader().getResource(this.pathG).toURI());
        //Path path1 = Paths.get(this.pathG);
        List<String> grids = Files.readAllLines(path1);
        int id = difficultes.indexOf(dif);
        int nbGrid = this.getNbGrilleDif(id);
        int idGrid = 0 ;
        Random r = new Random();
        int idGridARecup = r.nextInt(nbGrid);
        for(String g : grids){
            String[] s = g.split("!");
            if(s[0].equals(dif)){
                if(idGrid==idGridARecup){
                    return s[1]+s[2];
                }
                idGrid++;
            }
        }
        return grids.get(0);//pas correcte mais ça passera forcément par ce qu'on veut donc pas grave
    }

    //Les scores pour un id et une difficulté de grille donnés doivent être écrit de cette manière : "nom1:34 nom2:67 nom3:54 ..."
    //On part du postula que si getClassement est appelé il y a au moins un score d'enregistré (seulement appelé dans le cas de generate et pas de generate random)
    public Score[] getClassement(int id, String dif) throws IOException, URISyntaxException{
        Path path = Paths.get(getClass().getClassLoader().getResource(this.pathG).toURI());
        //Path path = Paths.get(this.pathG);
        List<String> infosGrilles = Files.readAllLines(path);
        for(String g : infosGrilles){
            String[] infos = g.split("!");
            if(infos[0].equals(dif) && Integer.parseInt(infos[1])==id){
                String[] scores = infos[3].split(" ");
                Score[] res = new Score[scores.length];
                ArrayList<Score> scores2 = new ArrayList<Score>();
                for(String s : scores){
                    String[] nomScore = s.split(":");
                    Score score = new Score(nomScore[0], Integer.parseInt(nomScore[1]));
                    scores2.add(score);
                }
                scores2.sort(Comparator.comparing(Score::getScore));
                for(int i = 0;i<scores2.size();i++){
                    res[i] = scores2.get(i);
                }
                return res;
            }
        }
        return new Score[1]; //pas bon mais on sait que la route ne sera appelée que si la partie est déjà enregistrée donc on va forcément la trouver
    }


    public void topScoreRegister(Score s, String dif, int id) throws IOException, InterruptedException, URISyntaxException{
        Thread.sleep(1000);
        String playerName = s.getName();
        String playerScore = s.getScore() + "";
        Path path = Paths.get(getClass().getClassLoader().getResource(this.pathG).toURI());
        //Path path = Paths.get(this.pathG);
        List<String> grillesInfo = Files.readAllLines(path);
        for(String g : grillesInfo){
            String[] infos = g.split("!");
            String nouvellesInfos = infos[0]+"!"+infos[1]+"!"+infos[2]+"!";
            if(infos[0].equals(dif) && Integer.parseInt(infos[1])==id){
                if(infos.length<4){
                    nouvellesInfos += playerName+":"+playerScore;
                    grillesInfo.set(grillesInfo.indexOf(g), nouvellesInfos);
                    Files.write(path, grillesInfo);
                    return;
                }else{
                    Boolean trouve = false;
                    String[] tabScores = infos[3].split(" ");
                    for(String score : tabScores){
                        String[] t = score.split(":");
                        if(t[0].equals(playerName)){
                            trouve = true;
                            if(Integer.parseInt(t[1])>Integer.parseInt(playerScore)){
                            nouvellesInfos += playerName+":"+playerScore+" ";
                            }else{
                                nouvellesInfos+=score+" ";
                            }
                        }else{
                            nouvellesInfos+=score+" ";
                        }
                    }
                    if(!trouve){
                        nouvellesInfos+=playerName+":"+playerScore+" ";
                    }
                    grillesInfo.set(grillesInfo.indexOf(g), nouvellesInfos);
                    Files.write(path, grillesInfo);
                    return;
                }
            }
        }
    }

    public int nombreDeGrilles() throws IOException, URISyntaxException{
        Path path = Paths.get(getClass().getClassLoader().getResource(this.pathG).toURI());
        //Path path = Paths.get(this.pathG);
        List<String> grids = Files.readAllLines(path);
        return grids.size();
    }

    public void metAJourNbGrille(int id) throws IOException, URISyntaxException{
        Path path = Paths.get(getClass().getClassLoader().getResource(this.pathN).toURI());
        //Path path = Paths.get(this.pathN);
        List<String> nb = Files.readAllLines(path);
        int nbGrid = Integer.parseInt(nb.get(id));
        nbGrid++;
        nb.set(id, nbGrid+"");
        Files.write(path, nb);
    }

    public int getNbGrilleDif(int id) throws IOException, URISyntaxException{
        Path path = Paths.get(getClass().getClassLoader().getResource(this.pathN).toURI());
        //Path path = Paths.get(this.pathN);
        List<String> nb = Files.readAllLines(path);
        int nbGrid = Integer.parseInt(nb.get(id));
        return nbGrid;
    }

    public void clearNbGrille() throws IOException, URISyntaxException{
        Path path = Paths.get(getClass().getClassLoader().getResource(this.pathN).toURI());
        //Path path = Paths.get(this.pathN);
        List<String> nb = Files.readAllLines(path);
        List<String> l = nb.stream()
                            .map(a -> "0")
                            .collect(Collectors.toList());
        Files.write(path, l);
    }

    public void clearGrid() throws IOException, URISyntaxException{
        Path path = Paths.get(getClass().getClassLoader().getResource(this.pathG).toURI());
        //Path path = Paths.get(this.pathG);
        List<String> vide = new ArrayList<>();
        Files.write(path, vide);
    }

}
