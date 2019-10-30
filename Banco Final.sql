/*
Grupo = fn_Group
Campeonato = fn_Champ
Quartas de Final = fn_4_final

NOVO JEITO DE RETORNAR OS JOGOS:
SELECT timeA AS 'Time Casa', timeB AS 'Time Fora', golsA AS 'Gols Casa', golsB AS 'Gols Fora', CONVERT(VARCHAR,data,103) AS 'Data do Jogo'
FROM fn_mostraJogos()*/

CREATE PROCEDURE sp_mudaFinal (@id INT, @golsA INT, @golsB INT)
AS
BEGIN
    UPDATE Jogos
    SET gols_TimeA = @golsA, gols_TimeB = @golsB
    WHERE id_Jogo = @id
END

CREATE FUNCTION fn_mostraJogos()
RETURNS @tabela TABLE(
	id_Jogo		INT,
	timeA		VARCHAR(40),
	timeB		VARCHAR(40),
	golsA		INT,
	golsB		INT,
	data		DATE
)
AS
BEGIN
	DECLARE @tB VARCHAR(40), @gA INT, @gB INT, @dT DATE, @cnt INT
	SET @cnt = 1
	INSERT INTO @tabela (id_Jogo, timeA)
	SELECT jg.id_Jogo, tm.nome_Time
	FROM Times tm
	INNER JOIN Jogos jg 
	ON jg.cod_TimeA = tm.codigo_Time
	WHILE (@cnt <= 150)
	BEGIN
		SET @tb = (SELECT tm.nome_Time FROM Times tm INNER JOIN Jogos jg ON jg.cod_TimeB = tm.codigo_Time WHERE jg.id_Jogo = @cnt)
		SET @gA = (SELECT gols_TimeA FROM Jogos WHERE id_Jogo = @cnt)
		SET @gB = (SELECT gols_TimeB FROM Jogos WHERE id_Jogo = @cnt)
		SET @dT = (SELECT data FROM Jogos WHERE id_Jogo = @cnt)
		UPDATE @tabela
		SET timeB = @tB, golsA = @gA, golsB = @gB, data = @dT
		WHERE id_Jogo = @cnt
		SET @cnt = @cnt + 1
	END
	RETURN
END

CREATE FUNCTION fn_4_Final()
RETURNS @tabela TABLE (
    codTime     INT,
    nomeTime    VARCHAR(40)
)
AS
BEGIN
    INSERT INTO @tabela 
    SELECT TOP 2 tm.codigo_Time, ng.nomeTime FROM fn_Group('A') ng
    INNER JOIN Times tm
    ON tm.nome_Time = ng.nomeTime
    ORDER BY ng.pontos DESC, ng.vitorias DESC, ng.golsM DESC, ng.saldoG DESC
    INSERT INTO @tabela 
    SELECT TOP 2 tm.codigo_Time, ng.nomeTime FROM fn_Group('B') ng
    INNER JOIN Times tm
    ON tm.nome_Time = ng.nomeTime
    ORDER BY ng.pontos DESC, ng.vitorias DESC, ng.golsM DESC, ng.saldoG DESC
    INSERT INTO @tabela 
    SELECT TOP 2 tm.codigo_Time, ng.nomeTime FROM fn_Group('C') ng
    INNER JOIN Times tm
    ON tm.nome_Time = ng.nomeTime
    ORDER BY ng.pontos DESC, ng.vitorias DESC, ng.golsM DESC, ng.saldoG DESC
    INSERT INTO @tabela 
    SELECT TOP 2 tm.codigo_Time, ng.nomeTime FROM fn_Group('D') ng
    INNER JOIN Times tm
    ON tm.nome_Time = ng.nomeTime
    ORDER BY ng.pontos DESC, ng.vitorias DESC, ng.golsM DESC, ng.saldoG DESC
    RETURN
END

CREATE FUNCTION fn_Champ() 
/*
SELECT nomeTime AS Time, jogosD AS 'Jogos Disputados', vitorias AS 'Vitorias', 
empates AS 'Empates', derrotas AS 'Derrotas', golsM AS 'Gols Marcados',
golsS AS 'Gols Sofridos', saldoG AS 'Saldo de Gols', pontos AS 'Pontos' FROM fn_Champ()
ORDER BY pontos DESC, vitorias DESC, golsM DESC, saldoG DESC*/
RETURNS @tabela TABLE (
	idT			INT IDENTITY,
	nomeTime	VARCHAR(40),
	jogosD		INT,
	vitorias	INT,
	empates		INT,
	derrotas	INT,
	golsM		INT,
	golsS		INT,
	saldoG		INT,
	pontos		INT
)
AS
BEGIN
	INSERT INTO @tabela (nomeTime, jogosD, vitorias, empates, derrotas,
    golsM, golsS, saldoG, pontos) SELECT nomeTime, jogosD, vitorias, 
    empates, derrotas, golsM, golsS, saldoG, pontos FROM fn_Group('A')
    INSERT INTO @tabela (nomeTime, jogosD, vitorias, empates, derrotas,
    golsM, golsS, saldoG, pontos) SELECT nomeTime, jogosD, vitorias, 
    empates, derrotas, golsM, golsS, saldoG, pontos FROM fn_Group('B')
    INSERT INTO @tabela (nomeTime, jogosD, vitorias, empates, derrotas,
    golsM, golsS, saldoG, pontos) SELECT nomeTime, jogosD, vitorias, 
    empates, derrotas, golsM, golsS, saldoG, pontos FROM fn_Group('C')
    INSERT INTO @tabela (nomeTime, jogosD, vitorias, empates, derrotas,
    golsM, golsS, saldoG, pontos) SELECT nomeTime, jogosD, vitorias, 
    empates, derrotas, golsM, golsS, saldoG, pontos FROM fn_Group('D')
	RETURN
END

CREATE FUNCTION fn_Group (@id CHAR(1)) 
/*Criar a view que começa na linha 449
SELECT nomeTime AS Time, jogosD AS 'Jogos Disputados', vitorias AS 'Vitorias', 
empates AS 'Empates', derrotas AS 'Derrotas', golsM AS 'Gols Marcados',
golsS AS 'Gols Sofridos', saldoG AS 'Saldo de Gols', pontos AS 'Pontos' FROM fn_Group('') 
ORDER BY pontos DESC, vitoras DESC, golsM DESC, saldoG DESC
(no lugar de '' por o id do grupo (A,B,C ou D))*/
RETURNS @tabela TABLE (
	idL			INT	IDENTITY,
	idT			INT,
	nomeTime	VARCHAR(40),
	jogosD		INT,
	vitorias	INT,
	empates		INT,
	derrotas	INT,
	golsM		INT,
	golsS		INT,
	saldoG		INT,
	pontos		INT
)
AS
BEGIN
	DECLARE @golsM INT, @golsS INT, @saldoG INT, @pnts INT,
			@vit INT, @der INT , @emp INT, @cont INT, @aux INT
	INSERT INTO @tabela (idT, nomeTime, jogosD)
	SELECT tm.codigo_Time, vj.nome_Time, SUM(vj.q_Jogos) FROM v_cJogos vj
    INNER JOIN Times tm
    ON tm.nome_Time = vj.nome_Time
    INNER JOIN Grupos gp
    ON gp.cod_Time = tm.codigo_Time
    WHERE gp.id_Grupo = @id
	GROUP BY tm.codigo_Time, vj.nome_Time
	ORDER BY vj.nome_Time ASC
    SET @cont = 1
    SET @golsM = 0
    SET @golsS = 0
    WHILE (@cont <= 5)
    BEGIN
		SET @golsM = 0
		SET @golsS = 0
		SET @vit = 0
		SET @der = 0
		SET @emp = 0
		SET @aux = (SELECT idT FROM @tabela WHERE idL = @cont)
        IF (SELECT SUM(gols_TimeA) FROM Jogos WHERE cod_TimeA = @aux) IS NOT NULL 
			SET @golsM = @golsM + (SELECT SUM(gols_TimeA) FROM Jogos WHERE cod_TimeA = @aux)
        IF (SELECT SUM(gols_TimeB) FROM Jogos WHERE cod_TimeB = @aux) IS NOT NULL
			SET @golsM = @golsM + (SELECT SUM(gols_TimeB) FROM Jogos WHERE cod_TimeB = @aux)
        IF (SELECT SUM(gols_TimeB) FROM Jogos WHERE cod_TimeA = @aux) IS NOT NULL
			SET @golsS = @golsS + (SELECT SUM(gols_TimeB) FROM Jogos WHERE cod_TimeA = @aux)
        IF (SELECT SUM(gols_TimeA) FROM Jogos WHERE cod_TimeB = @aux) IS NOT NULL
			SET @golsS = @golsS + (SELECT SUM(gols_TimeA) FROM Jogos WHERE cod_TimeB = @aux)
        SET @saldoG = @golsM - @golsS
        IF (SELECT COUNT(id_Jogo) FROM Jogos WHERE cod_TimeA = @aux AND gols_TimeA > gols_TimeB GROUP BY cod_TimeA) IS NOT NULL
			SET @vit = @vit + (SELECT COUNT(id_Jogo) FROM Jogos WHERE cod_TimeA = @aux AND gols_TimeA > gols_TimeB GROUP BY cod_TimeA)
        IF (SELECT COUNT(id_Jogo) FROM Jogos WHERE cod_TimeB = @aux AND gols_TimeB > gols_TimeA GROUP BY cod_TimeB) IS NOT NULL
			SET @vit = @vit + (SELECT COUNT(id_Jogo) FROM Jogos WHERE cod_TimeB = @aux AND gols_TimeB > gols_TimeA GROUP BY cod_TimeB)
        IF (SELECT COUNT(id_Jogo) FROM Jogos WHERE cod_TimeA = @aux AND gols_TimeA < gols_TimeB GROUP BY cod_TimeA) IS NOT NULL
			SET @der = @der + (SELECT COUNT(id_Jogo) FROM Jogos WHERE cod_TimeA = @aux AND gols_TimeA < gols_TimeB GROUP BY cod_TimeA)
        IF (SELECT COUNT(id_Jogo) FROM Jogos WHERE cod_TimeB = @aux AND gols_TimeB < gols_TimeA GROUP BY cod_TimeB) IS NOT NULL
			SET @der = @der + (SELECT COUNT(id_Jogo) FROM Jogos WHERE cod_TimeB = @aux AND gols_TimeB < gols_TimeA GROUP BY cod_TimeB)
        IF (SELECT COUNT(id_Jogo) FROM Jogos WHERE cod_TimeA = @aux AND gols_TimeA = gols_TimeB GROUP BY cod_TimeA) IS NOT NULL
			SET @emp = @emp + (SELECT COUNT(id_Jogo) FROM Jogos WHERE cod_TimeA = @aux AND gols_TimeA = gols_TimeB GROUP BY cod_TimeA)
        IF (SELECT COUNT(id_Jogo) FROM Jogos WHERE cod_TimeB = @aux AND gols_TimeB = gols_TimeA GROUP BY cod_TimeB) IS NOT NULL
			SET @emp = @emp + (SELECT COUNT(id_Jogo) FROM Jogos WHERE cod_TimeB = @aux AND gols_TimeB = gols_TimeA GROUP BY cod_TimeB)
        SET @pnts = (@vit * 3) + @emp
        UPDATE @tabela 
        SET vitorias = @vit, empates = @emp, derrotas = @der,
            golsM = @golsM, golsS = @golsS, saldoG = @saldoG, pontos = @pnts
        WHERE idL = @cont
        SET @cont = @cont + 1
    END
	RETURN
END
/*
CREATE TRIGGER t_tg
ON Times
INSTEAD OF INSERT, UPDATE, DELETE
AS
BEGIN
	RAISERROR('Função não permitida',16,1)
END
*/

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
            @cnt4	INT,	@grupo  CHAR(1)
    SET @cnt1 = 0
	SET @cnt2 = 0
    SET @cnt3 = 1
	SET @cnt4 = 0
    SET @data = '30/01/2016'
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
		SET @cnt4 += 1
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
		SET @query = 'INSERT INTO Jogos VALUES ('+CAST(@cnt4 AS VARCHAR)+', '
		+CAST(@t1 AS VARCHAR)+', '+CAST(@t2 AS VARCHAR)+', '
		+CAST(@gols1 AS VARCHAR)+', '+CAST(@gols2 AS VARCHAR)+', '''
		+CAST(@data AS VARCHAR)+''')'
		EXEC(@query)
	END
END

select * from jogos
CREATE PROCEDURE sp_divGrp
AS
BEGIN
	DECLARE @query VARCHAR(MAX), @qTimes INT, 
            @idTime INT, @vrfG INT, @vrfT INT,
            @grupo CHAR(1), @aleatorio INT
	SELECT @qTimes = COUNT(cod_Time) FROM Grupos
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
    id_Jogo		    INT             NOT NULL,
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
EXEC sp_geraJogos

CREATE VIEW v_cJogos AS
SELECT tm.nome_Time AS nome_Time, COUNT(cod_TimeA) AS q_Jogos
FROM Jogos 
INNER JOIN Times tm
ON tm.codigo_Time = cod_TimeA
GROUP BY cod_TimeA, tm.nome_Time
UNION
SELECT tm.nome_Time AS nome_Time, COUNT(cod_TimeB) AS q_Jogos
FROM Jogos
INNER JOIN Times tm
ON tm.codigo_Time = cod_TimeB
GROUP BY cod_TimeB, tm.nome_Time
/*
select nome_Time, SUM(q_Jogos) from v_cJogos 
group by nome_Time
order by nome_Time Asc*/