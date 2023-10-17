package game;

public class Score {
    private String name;
    private int score;

    public Score(String s, int n){
        this.name = s;
        this.score = n;
    }

    public String getName(){
        return this.name;
    }
    public int getScore(){
        return this.score;
    }
}
