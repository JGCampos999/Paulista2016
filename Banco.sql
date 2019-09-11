CREATE TABLE Times(
    codigo_Time             INT             NOT NULL    PRIMARY KEY,
    nome_Time               VARCHAR(40)     NOT NULL,
    cidade                  VARCHAR(40)     NOT NULL,
    estadio                 VARCHAR(40)     NOT NULL
)
CREATE TABLE Grupos(
    Grupo                   CHAR(1)         NOT NULL,
    cod_Time                INT             NOT NULL,
    FOREIGN KEY (cod_Time)  REFERENCES      Times(codigo_Time),
    PRIMARY KEY (id_Grupo, cod_Time)
)
CREATE TABLE Jogos(
    cod_TimeA               INT             NOT NULL,
    cod_TimeB               INT             NOT NULL,
    gols_TimeA              INT             NOT NULL,
    gols_TimeB              INT             NOT NULL,
    data                    DATE            NOT NULL
    FOREIGN KEY (cod_TimeA) REFERENCES Times(codigo_Time),
    FOREIGN KEY (cod_TimeB) REFERENCES Times(codigo_Time),
    PRIMARY KEY (cod_TimeA, cod_TimeB)
)

INSERT INTO Times VALUES
(1, 'Esporte Água Sant', 'Diadema', 'Distrital do Inamar'),
(2, 'Grêmio Osasco Audax', 'Osasco', 'José Liberatti'),
(3, 'Botafogo Futebol Clube', 'Ribeirão Preto', 'Santa Cruz'),
(4, 'Capivariano Futebol Clube', 'Capivari', 'Arena Capivari'),
(5, 'Sport Club Corinthians Paulista', 'São Paulo', 'Arena Corinthians'),
(6, 'Associação Ferroviária de Esportes', 'Araraquara', 'Fonte Luminosa'),
(7, 'Ituano Futebol Clube', 'Itu', 'Novelli Júnior'),
(8, 'Clube Atlético Linense', 'Lins', 'Gilberto Siqueira Lopes'),
(9, 'Mogi Mirim Esporte Clube', 'Mogi Mirim', 'Vall Chaves'),
(10, 'Grêmio Novorizontino', 'Novo Horizonte', 'Jorge Ismael de Biasi'),
(11, 'Oeste Futebol Clube', 'Itápolis', 'Amaros'),
(12, 'Sociedade Esportiva Palmeiras', 'São Paulo', 'Allianz Parque'),
(13, 'Associação Atlética Ponte Preta', 'Campinas', 'Moisés Lucarelli'),
(14, 'Red Bull Brasil', 'Campinas', 'Moisés Lucarelli'),
(15, 'Rio Claro Futebol Clube', 'Rio Claro', 'Augusto Schmidt Filho'),
(16, 'Santos Futebol Clube', 'Santos', 'Vila Belmiro'),
(17, 'Esporte Clube São Bento', 'Sorocaba', 'Walter Ribeiro'),
(18, 'São Bernardo Futebol Clube', 'São Bernardo do Campo', 'Primeiro de Maio'),
(19, 'São Paulo Futebol Clube', 'São Paulo', 'Morumbi'),
(20, 'Esporte Clube XV de Novembro', 'Piracicaba', 'Barão de Serra Negra')

CREATE PROCEDURE sp_insrtGrp(
            @grp CHAR(1),
            @time INT,
            @saida VARCHAR(MAX) OUTPUT)
AS
BEGIN
    DECLARE @query  VARCHAR(MAX)
    IF (@grp <> 'A' AND @grp <> 'B' AND @grp <> 'C' AND @grp <> 'D')
    BEGIN
        SET @saida = 'Grupo Inexistente'
    END
    ELSE
    BEGIN
        