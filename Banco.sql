CREATE PROCEDURE sp_divGrp(@saida VARCHAR(MAX) OUTPUT)
AS
BEGIN
	DECLARE @query VARCHAR(MAX), @qTimes INT, 
		@idTime INT, @vrG INT, @vrfT INT,
		@grupo CHAR(1), @aleatorio INT
	SELECT @qTimes = COUNT(cod_Time) FROM Grupos
	IF(@qTimes = 20)
	BEGIN
		SET @query = 'DELETE FROM Grupos'
		EXEC(@query)
        	SET @query = 'DELETE FROM Jogos'
		EXEC(@query)
	END
	SET @query = 'INSERT INTO Grupos VALUES (''A'', 5),(''B'', 16),(''C'', 12),(''D'', 19)'
	EXEC(@query)
	SET @idTime = 0
	WHILE @idTime < 20
	BEGIN
		SET @idTime += 1
		SELECT @vrfT = (SELECT cod_Time FROM Grupos WHERE cod_Time = @idTime)
		IF (@vrfT IS NULL)
		BEGIN
			SET @aleatorio = RAND()*(4-0)+1
			IF (@aleatorio = 1) SET @grupo = 'A'
			ELSE IF (@aleatorio = 2) SET @grupo = 'B'
			ELSE IF (@aleatorio = 3) SET @grupo = 'C'
			ELSE IF (@aleatorio = 4) SET @grupo = 'D'
			SELECT @vrfG = (SELECT COUNT(id_Grupo) FROM Grupos WHERE id_Grupo = @grupo)
			WHILE @vrfG > 4
			BEGIN
				SET @aleatorio = RAND()*(4-0)+1
				IF (@aleatorio = 1) SET @grupo = 'A'
				ELSE IF (@aleatorio = 2) SET @grupo = 'B'
				ELSE IF (@aleatorio = 3) SET @grupo = 'C'
				ELSE IF (@aleatorio = 4) SET @grupo = 'D'
				SELECT @vrfG = (SELECT COUNT(id_Grupo) FROM Grupos WHERE id_Grupo = @grupo)
		    	END
			SET @query = 'INSERT INTO Grupos VALUES ('''+@grupo+''','+CAST(@idTime AS VARCHAR)+')'
			EXEC (@query)
		END
	END
END

CREATE DATABASE Testes
GO
USE Testes

CREATE TABLE Times(
    codigo_Time             INT             NOT NULL    PRIMARY KEY,
    nome_Time               VARCHAR(40)     NOT NULL,
    cidade                  VARCHAR(40)     NOT NULL,
    estadio                 VARCHAR(40)     NOT NULL
)
CREATE TABLE Grupos(
    id_Grupo                CHAR(1)         NOT NULL,
    cod_Time                INT             NOT NULL,
    FOREIGN KEY (cod_Time)  REFERENCES      Times(codigo_Time),
    PRIMARY KEY (cod_Time)
)
CREATE TABLE Jogos(
    cod_TimeA               INT             NOT NULL,
    cod_TimeB               INT             NOT NULL,
    gols_TimeA              INT             NOT NULL,
    gols_TimeB              INT             NOT NULL,
    data                    DATE            NOT NULL
    FOREIGN KEY (cod_TimeA) REFERENCES Times(codigo_Time),
    FOREIGN KEY (cod_TimeB) REFERENCES Times(codigo_Time)
)

INSERT INTO Times VALUES
(1, 'Esporte Água Santa', 'Diadema', 'Distrital do Inamar'),
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

DECLARE @out VARCHAR(MAX)
EXEC sp_insrtGrp @out output
