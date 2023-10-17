package game;

import java.io.IOException;
import java.net.URISyntaxException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("api/sudoku")
public class SudokuController {

    Storage storage = Storage.INSTANCE;
    
    @GetMapping(path = "classement/{id_grid}/{difficulte}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Score[]> getClassement(@PathVariable("id_grid") int id_grid, @PathVariable("difficulte") String dif) throws IOException, URISyntaxException{
        if(this.storage.nombreDeGrilles()>=id_grid){
        return ResponseEntity.ok(storage.getClassement(id_grid, dif));
        }
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "La grille d'id donnée n'existe pas");
    }

    //Je ne sais pas quand est-ce qu'on peut renvoyer un mauvais statut http car si la grille n'était pas présente on la rajoute
    @PostMapping(path = "score/{id_grid}/{difficulte}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> postScore(@RequestBody Score s, @PathVariable("id_grid") int id_grid, @PathVariable("difficulte") String dif) throws IOException, InterruptedException, URISyntaxException{
        storage.topScoreRegister(s,dif,id_grid);
        return ResponseEntity.ok().build();
    }

    //On passe la difficulté voulu comme ça on récupère une grille déjà faite de la bonne diff
    //envoie un string dont le premier élément est l'id de la grille 
    @GetMapping(path = "grids/{dif_grille}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> getGrid(@PathVariable("dif_grille") String dif_grille) throws IOException, URISyntaxException{
        if(this.storage.getNbGrilleDif(this.storage.difficultes.indexOf(dif_grille))!=0){
            return ResponseEntity.ok(storage.getGrid(dif_grille));
        }else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "pas de grille de cette difficulté");
        }
    }

    //On rajoute une route Rest pour enregistrer une grille, pareille je sais pas quand envoyer un mauvais statut
    @PostMapping(path = "grid/register/{difficulte}", consumes = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<Void> postGrid(@RequestBody String grille, @PathVariable("difficulte") String dif) throws IOException, URISyntaxException{
        storage.predefinedGridRegister(grille, dif);
        return ResponseEntity.ok().build();
    }

    //nouvelle route pour récupérer le nombre de grilles + 1 déjà enregistrées d'une certain difficulté pour gérer correctement l'id lors de l'enregistrement du score
    @GetMapping(path = "grids/nbGrille/{dif_grille}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> getNbGrid(@PathVariable("dif_grille") String dif) throws IOException, URISyntaxException{
        return ResponseEntity.ok(((this.storage.getNbGrilleDif(this.storage.difficultes.indexOf(dif)))+1)+"");
    }

}
