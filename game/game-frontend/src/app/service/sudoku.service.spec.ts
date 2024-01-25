import { SudokuService } from './sudoku.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Partie } from '../Partie';
import { Score } from '../score';
import { EasyComponent } from '../components/easy/easy.component';

describe('SudokuService', () => {
  let service: SudokuService;
  let httpClientMock: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new SudokuService(spy);
    httpClientMock = spy;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sudoku', () => {
    it('should call http.get with the correct URL when random is false', async () => {
      const difficulty = 'easy';
      const random = false;
      const expectedUrl = `api/sudoku/grids/${difficulty}`;
      httpClientMock.get.and.returnValue(of(''));
      await service.sudoku(difficulty, random);
      expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl, Object({ responseType: 'text' }) );
    });

    it('should call http.get with the correct URL when random is true', async () => {
      const difficulty = 'easy';
      const random = true;
      const expectedUrl = `sudoku-provider/${difficulty}`;
      httpClientMock.get.and.returnValue(of(''));
      await service.sudoku(difficulty, random);
      expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl, Object({ responseType: 'text' }) );
    });
  });

  describe('nbGrilles', () => {
    it('should call http.get with the correct URL', async () => {
      const difficulty = 'easy';
      const expectedUrl = `api/sudoku/grids/nbGrille/${difficulty}`;
      httpClientMock.get.and.returnValue(of(''));
      await service.nbGrilles(difficulty);
      expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl, Object({ responseType: 'text' }) );
    });
  });

  describe('sendNumbers', () => {
    it('should call http.post with the correct URL and data', async () => {
      const difficulty = 'easy';
      const expectedUrl = `api/sudoku/grid/register/${difficulty}`;
      httpClientMock.post.and.returnValue(of(undefined));
      service.currentPartie = new Partie("Tino", new EasyComponent(service), true);
      await service.sendNumbers(difficulty);
      expect(httpClientMock.post).toHaveBeenCalledWith(expectedUrl, JSON.stringify(""));
    });

    it('should log an error if http.post fails', async () => {
      const difficulty = 'easy';
      httpClientMock.post.and.throwError('Error');
      spyOn(console, 'log');
      await service.sendNumbers(difficulty);
      expect(console.log).toHaveBeenCalledWith("La grille n'a pas pu être enregistrée");
    });
  });

  describe('sendScore', () => {
    it('should call http.post with the correct URL, id, and data', async () => {
      const id = '123';
      const difficulty = 'easy';
      const score: Score = { name: "Tino", score: 100 };
      const expectedUrl = `api/sudoku/score/${id}/${difficulty}`;
      httpClientMock.post.and.returnValue(of(undefined));
      await service.sendScore(id, difficulty, score);
      expect(httpClientMock.post).toHaveBeenCalledWith(expectedUrl, score);
    });

    it('should log an error if http.post fails', async () => {
      const id = '234';
      const difficulty = 'easy';
      const score: Score = { name: "Ahmed", score: 200 };
      httpClientMock.post.and.throwError('Error');
      spyOn(console, 'log');
      await service.sendScore(id, difficulty, score);
      expect(console.log).toHaveBeenCalledWith(score);
    });
  });

  describe('getScores', () => {
    it('should call http.get with the correct URL, id, and difficulty', async () => {
      const id = '345';
      const difficulty = 'easy';
      const expectedUrl = `api/sudoku/classement/${id}/${difficulty}`;
      httpClientMock.get.and.returnValue(of([]));
      await service.getScores(id, difficulty);
      expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('partieAlreadyCreated', () => {
    it('should return true if currentPartie is defined', () => {
      service.currentPartie = new Partie("Marceline", new EasyComponent(service), true);
      expect(service.partieAlreadyCreated).toBe(true);
    });

    it('should return false if currentPartie is undefined', () => {
      service.currentPartie = undefined;
      expect(service.partieAlreadyCreated).toBe(false);
    });
  });

  describe('getName', () => {
    it('should return the name of currentPartie if it is defined', () => {
      const partie = new Partie("Joueur1", new EasyComponent(service), true);
      partie.name = 'Arnaud';
      service.currentPartie = partie;
      expect(service.getName()).toBe('Arnaud');
    });
  });

  describe('partieFinie', () => {
    it('should return true if currentPartie is defined and fini is true', () => {
      const partie = new Partie("Joueur1", new EasyComponent(service), true);
      partie.fini = true;
      service.currentPartie = partie;
      expect(service.partieFinie()).toBe(true);
    });

    it('should return false if currentPartie is defined but fini is false', () => {
      const partie = new Partie("Joueur1", new EasyComponent(service), true);
      partie.fini = false;
      service.currentPartie = partie;
      expect(service.partieFinie()).toBe(false);
    });
  });

});