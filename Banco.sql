CREATE PROCEDURE sp_geraJogos
AS
BEGIN
    DECLARE @jogosTable TABLE(
		id      INT,
        jogo    VARCHAR(10)
    )
    DECLARE @outerGrp TABLE(
        id      CHAR(1),
        time    INT
    )
    DECLARE @inGrp TABLE (
        id      CHAR(1),
        time    INT
    )
    DECLARE @query  VARCHAR(MAX),
            @mayB1  VARCHAR(10),
            @mayB2  VARCHAR(10),
            @data   DATE,   @randN  INT,
            @t1     INT,    @t2     INT,
            @gols1  INT,    @gols2  INT,
            @cnt1   INT,    @cnt2   INT,
            @cnt3   INT,    @cntGrp INT,
            @grupo  CHAR(1)
    SET @cnt1 = 0
	SET @cnt2 = 0
    SET @cnt3 = 1
    SET @data = GETDATE()
    SET @grupo = 'A'
    SET @cntGrp = 1
    SET @cnt2 = (SELECT COUNT(id_Grupo) FROM Grupos WHERE id_Grupo = @grupo)
    INSERT INTO @outerGrp SELECT * FROM Grupos WHERE id_Grupo <> @grupo
    INSERT INTO @inGrp SELECT * FROM Grupos WHERE id_Grupo = @grupo
	WHILE datepart(dw, @data) <> 1 AND DATEPART(dw, @data) <> 4
	BEGIN
		SET @data = DATEADD(dw, 1, @data)
	END
    WHILE @cnt1 <= @cnt2 AND @cnt2 IS NOT NULL AND @cnt2 <> 0
    BEGIN
        SET @cnt1 += 1
        SET @t1 =  (SELECT MIN(time) FROM @inGrp)
		SET @t2 = 0
        WHILE @t2 < (SELECT MAX(time) FROM @outerGrp)
        BEGIN
            SET @t2 += 1
			WHILE @t2 NOT IN (SELECT time FROM @outerGrp)
			BEGIN
				SET @t2 += 1
			END
            SET @mayB1 = CAST(@t1 AS VARCHAR)+' X '+(CAST(@t2 AS VARCHAR))
            SET @mayB2 = CAST(@t2 AS VARCHAR)+' X '+(CAST(@t1 AS VARCHAR))
            IF (SELECT jogo FROM @jogosTable WHERE jogo = @mayB1 OR jogo = @mayB2) IS NULL
            BEGIN
                SET @cnt3 += 1
                INSERT INTO @jogosTable VALUES (@cnt3, @mayB1)
            END
        END
        DELETE FROM @inGrp WHERE time = (SELECT MIN(time) FROM @inGrp)
        IF(@cnt1 = (SELECT COUNT(id_Grupo) FROM Grupos WHERE id_Grupo = @grupo))
        BEGIN
            SET @cnt1 = 0
            SET @cntGrp +=1
            IF @cntGrp = 2 SET @grupo = 'B'
            ELSE IF @cntGrp = 3 SET @grupo = 'C'
            ELSE IF @cntGrp = 4 SET @grupo = 'D'
			ELSE SET @grupo = 'E'
            DELETE FROM @outerGrp
            DELETE FROM @inGrp
            INSERT INTO @outerGrp SELECT * FROM Grupos WHERE id_Grupo <> @grupo
            INSERT INTO @inGrp SELECT * FROM Grupos WHERE id_Grupo = @grupo
            SET @cnt2 = (SELECT COUNT(id_Grupo) FROM Grupos WHERE id_Grupo = @grupo)
        END
    END
	SET @cnt3 = 0
	SET @cntGrp = (SELECT COUNT(id) FROM @jogosTable)
	WHILE @cntGrp <> 0
	BEGIN
		SET @cnt3 += 1
		IF @cntGrp = 1 
		BEGIN
			SET @cnt1 = (SELECT id FROM @jogosTable)
			SET @cntGrp = 0
		END
		ELSE
		BEGIN
			SET @cnt1 = (SELECT MIN(id) FROM @jogosTable)
			SET @cnt2 = (SELECT MAX(id) FROM @jogosTable)
			SET @randN = RAND()*(@cnt2 - (@cnt1 - 1)) + 1
			WHILE @randN NOT IN (SELECT id FROM @jogosTable)
			BEGIN
				SET @randN = RAND()*(@cnt2 - (@cnt1 - 1)) + 1
			END
		END
		SET @t1 = 0
		SET @t2 = 0
		SET @query = (SELECT jogo FROM @jogosTable WHERE id = @randN)
		SET @t1 = CAST(LTRIM(RTRIM(SUBSTRING(@query,1,2)))AS INT)
		IF SUBSTRING(@query,len(@query)-2,3) LIKE '%X%' SET @t2 = CAST(LTRIM(RTRIM(SUBSTRING(@query,len(@query)-1,3)))AS INT)
		ELSE SET @t2 = CAST(LTRIM(RTRIM(SUBSTRING(@query,len(@query)-2,3)))AS INT)
		IF (@cnt3 = 11)
		BEGIN
			IF DATEPART(dw, @data) = 1 SET @data = DATEADD(dw, 3, @data)
			ELSE IF DATEPART(dw, @data) = 4 SET @data = DATEADD(dw, 4, @data)
			SET @cnt3 = 0
		END
		SET @gols1 = RAND()*(4-0)
		SET @gols2 = RAND()*(4-0)
		DELETE FROM @jogosTable WHERE id = @randN
		UPDATE @jogosTable SET id = id - 1 WHERE id > @randN
		IF @cntGrp <> 0 SET @cntGrp = (SELECT COUNT(id) FROM @jogosTable)
		SET @query = 'INSERT INTO Jogos VALUES ('+CAST(@t1 AS VARCHAR)+', '+
		CAST(@t2 AS VARCHAR)+', '+CAST(@gols1 AS VARCHAR)+', '+
		CAST(@gols2 AS VARCHAR)+', '''+CAST(@data AS VARCHAR)+''')'
		EXEC(@query)
	END
END

CREATE PROCEDURE sp_divGrp
AS
BEGIN
	DECLARE @query VARCHAR(MAX), @qTimes INT, 
            @idTime INT, @vrfG INT, @vrfT INT,
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
