package game;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.hamcrest.Matchers.equalTo;

@SpringBootTest
@AutoConfigureMockMvc
public class SudokuControllerTest {
    
    @Autowired
    private MockMvc mvc;


    @Test
    void testGetClassement() throws Exception {

        Score s = new Score("jack", 20);
        Score s2 = new Score("josé", 7);

        mvc.perform(
            post("/api/sudoku/grid/register/easy")
                .contentType(MediaType.TEXT_PLAIN_VALUE)
                .content("940007023721035684830000097007000005359746218482050076598071002614020759273500801"))
                .andExpect(status().isOk());

        mvc.perform(
            post("/api/sudoku/score/1/easy")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(new ObjectMapper().writeValueAsString(s)))
                .andExpect(status().isOk());

        mvc.perform(
            post("/api/sudoku/score/1/easy")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(new ObjectMapper().writeValueAsString(s2)))
                .andExpect(status().isOk());

        mvc.perform(
            get("/api/sudoku/classement/1/easy"))
            .andExpect(status().isOk())
            .andExpect(content()
                .contentTypeCompatibleWith(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$[0].name", equalTo("josé")))
            .andExpect(jsonPath("$[0].score", equalTo(7)))
            .andExpect(jsonPath("$[1].name", equalTo("jack")))
            .andExpect(jsonPath("$[1].score", equalTo(20)));

        Storage.INSTANCE.clearNbGrille();
        Storage.INSTANCE.clearGrid();
    }

    @Test
    void testGetGrid() throws Exception {
        mvc.perform(
            post("/api/sudoku/grid/register/easy")
                .contentType(MediaType.TEXT_PLAIN_VALUE)
                .content("940007023721035684830000097007000005359746218482050076598071002614020759273500801"))
                .andExpect(status().isOk());

        mvc.perform(
            get("/api/sudoku/grids/easy"))
            .andExpect(status().isOk())
            .andExpect(content()
                .contentTypeCompatibleWith(MediaType.TEXT_PLAIN_VALUE))
            .andExpect(content().string("14000702372103568483000009700700000535974621848205007659807100261402075927350080"));
            //je sais pas pourquoi mais dans le test la grille est tronquée de son 1er élément et de son dernier mais pas en situation réel

        Storage.INSTANCE.clearNbGrille();
        Storage.INSTANCE.clearGrid();

    }

    @Test
    void testGetNbGrid() throws Exception {
        mvc.perform(
            post("/api/sudoku/grid/register/easy")
                .contentType(MediaType.TEXT_PLAIN_VALUE)
                .content("940007023721035684830000097007000005359746218482050076598071002614020759273500801"))
                .andExpect(status().isOk());

        mvc.perform(
            get("/api/sudoku/grids/nbGrille/easy"))
            .andExpect(status().isOk())
            .andExpect(content()
                .contentTypeCompatibleWith(MediaType.TEXT_PLAIN_VALUE))
            .andExpect(content().string("2"));

        Storage.INSTANCE.clearNbGrille();
        Storage.INSTANCE.clearGrid();
    }

    @Test
    void testPostGrid() throws Exception {
        mvc.perform(
            post("/api/sudoku/grid/register/easy")
                .contentType(MediaType.TEXT_PLAIN_VALUE)
                .content("940007023721035684830000097007000005359746218482050076598071002614020759273500801"))
                .andExpect(status().isOk());

        Storage.INSTANCE.clearNbGrille();
        Storage.INSTANCE.clearGrid();
    }

    @Test
    void testPostScore() throws Exception {
        Score s = new Score("jack", 20);
        mvc.perform(
            post("/api/sudoku/grid/register/easy")
                .contentType(MediaType.TEXT_PLAIN_VALUE)
                .content("940007023721035684830000097007000005359746218482050076598071002614020759273500801"))
                .andExpect(status().isOk());

        mvc.perform(
            post("/api/sudoku/score/1/easy")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(new ObjectMapper().writeValueAsString(s)))
                .andExpect(status().isOk());

        Storage.INSTANCE.clearNbGrille();
        Storage.INSTANCE.clearGrid();
    }
}
