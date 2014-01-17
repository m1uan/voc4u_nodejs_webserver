drop table scores_t;
CREATE TABLE scores_t (
    lesson INTEGER NOT NULL,
    game INTEGER NOT NULL,
    lang CHAR(2) NOT NULL,
    scores_json TEXT NOT NULL,
    changed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    debug INTEGER DEFAULT 0,
    PRIMARY KEY(lesson,game,lang,debug)
);

insert into scores_t (lesson, game, lang,scores_json) VALUES
    (1001, 0,'en' , '[ { "name":"Milan Medlik", "score": 3000, "time":"0" }, { "name":"Milan Medlik", "score": 2500, "time":"0" }, { "name":"Milan Medlik", "score": 2000, "time":"0" }, { "name":"Milan Medlik", "score": 1500, "time":"0" }, { "name":"Milan Medlik", "score": 1250, "time":"0" }, { "name":"Milan Medlik", "score": 1000, "time":"0" }, { "name":"Milan Medlik", "score": 750, "time":"0" }, { "name":"Milan Medlik", "score": 600, "time":"0" }, { "name":"Milan Medlik", "score": 500, "time":"0" }, { "name":"Milan Medlik", "score": 400, "time":"0" }, { "name":"Milan Medlik", "score": 300, "time":"0" }, { "name":"Milan Medlik", "score": 200, "time":"0" }, { "name":"Milan Medlik", "score": 100, "time":"0" } ]')
    ,(1002, 0,'en' , '[ { "name":"Milan Medlik", "score": 3000, "time":"0" }, { "name":"Milan Medlik", "score": 2500, "time":"0" }, { "name":"Milan Medlik", "score": 2000, "time":"0" }, { "name":"Milan Medlik", "score": 1500, "time":"0" }, { "name":"Milan Medlik", "score": 1250, "time":"0" }, { "name":"Milan Medlik", "score": 1000, "time":"0" }, { "name":"Milan Medlik", "score": 750, "time":"0" }, { "name":"Milan Medlik", "score": 600, "time":"0" }, { "name":"Milan Medlik", "score": 500, "time":"0" }, { "name":"Milan Medlik", "score": 400, "time":"0" }, { "name":"Milan Medlik", "score": 300, "time":"0" }, { "name":"Milan Medlik", "score": 200, "time":"0" }, { "name":"Milan Medlik", "score": 100, "time":"0" } ]')
    ,(1003, 0,'en' , '[ { "name":"Milan Medlik", "score": 3000, "time":"0" }, { "name":"Milan Medlik", "score": 2500, "time":"0" }, { "name":"Milan Medlik", "score": 2000, "time":"0" }, { "name":"Milan Medlik", "score": 1500, "time":"0" }, { "name":"Milan Medlik", "score": 1250, "time":"0" }, { "name":"Milan Medlik", "score": 1000, "time":"0" }, { "name":"Milan Medlik", "score": 750, "time":"0" }, { "name":"Milan Medlik", "score": 600, "time":"0" }, { "name":"Milan Medlik", "score": 500, "time":"0" }, { "name":"Milan Medlik", "score": 400, "time":"0" }, { "name":"Milan Medlik", "score": 300, "time":"0" }, { "name":"Milan Medlik", "score": 200, "time":"0" }, { "name":"Milan Medlik", "score": 100, "time":"0" } ]')
    ,(1004, 0,'en' , '[ { "name":"Milan Medlik", "score": 3000, "time":"0" }, { "name":"Milan Medlik", "score": 2500, "time":"0" }, { "name":"Milan Medlik", "score": 2000, "time":"0" }, { "name":"Milan Medlik", "score": 1500, "time":"0" }, { "name":"Milan Medlik", "score": 1250, "time":"0" }, { "name":"Milan Medlik", "score": 1000, "time":"0" }, { "name":"Milan Medlik", "score": 750, "time":"0" }, { "name":"Milan Medlik", "score": 600, "time":"0" }, { "name":"Milan Medlik", "score": 500, "time":"0" }, { "name":"Milan Medlik", "score": 400, "time":"0" }, { "name":"Milan Medlik", "score": 300, "time":"0" }, { "name":"Milan Medlik", "score": 200, "time":"0" }, { "name":"Milan Medlik", "score": 100, "time":"0" } ]')
    ,(1005, 0,'en' , '[ { "name":"Milan Medlik", "score": 3000, "time":"0" }, { "name":"Milan Medlik", "score": 2500, "time":"0" }, { "name":"Milan Medlik", "score": 2000, "time":"0" }, { "name":"Milan Medlik", "score": 1500, "time":"0" }, { "name":"Milan Medlik", "score": 1250, "time":"0" }, { "name":"Milan Medlik", "score": 1000, "time":"0" }, { "name":"Milan Medlik", "score": 750, "time":"0" }, { "name":"Milan Medlik", "score": 600, "time":"0" }, { "name":"Milan Medlik", "score": 500, "time":"0" }, { "name":"Milan Medlik", "score": 400, "time":"0" }, { "name":"Milan Medlik", "score": 300, "time":"0" }, { "name":"Milan Medlik", "score": 200, "time":"0" }, { "name":"Milan Medlik", "score": 100, "time":"0" } ]')
         ;