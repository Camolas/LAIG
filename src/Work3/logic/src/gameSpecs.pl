%%%%%%%%%%%% creates the initial game for each game mode, 
%%%%%%%%%%%% initializing the 3 boards, and the information in the game.
%%%%%%%%%%%% game is a list of:
%%%%%%%%%%%% [Piece Board, Height Board, Number of Pieces Board,
%%%%%%%%%%%%  Actual Player, Game state (no - no winner / yes - winner),
%%%%%%%%%%%%  Game Mode (human-human/human-machine/machine-machine),
%%%%%%%%%%%%  Num of flat pieces, num of holed pieces, num of double pieces]             
human_human(Game):-
        empty_board(PieceBoard),
        
        empty_height(HeightBoard),
        
        empty_numPieces(NumPiecesBoard),
        
        Game = [PieceBoard, HeightBoard, NumPiecesBoard, player_1, no, hh, 8 ,8, 8, 0].

human_machine(Game, Level):-
        empty_board(PieceBoard),
       
        empty_height(HeightBoard),
        
        empty_numPieces(NumPiecesBoard),
        
        Game = [PieceBoard, HeightBoard, NumPiecesBoard, player_1, no, hm, 8 ,8, 8, Level].

machine_machine(Game, Level):-
        empty_board(PieceBoard),
        
        empty_height(HeightBoard),
        
        empty_numPieces(NumPiecesBoard),
        
        Game = [PieceBoard, HeightBoard, NumPiecesBoard, machine, no, mm, 8 ,8, 8, Level].

%%% gets the piece board from the game
get_pieceBoard(Game,PieceBoard):-
        search_list(0, Game, PieceBoard).

%%% updates the pieces board
set_pieceBoard(Game, NewPB, NewGame):-
        change_list_at(0, Game, NewPB, NewGame).


%%% gets the height board from the game
get_heightBoard(Game,HeightBoard):-
        search_list(1, Game, HeightBoard).

%%% updates the height board
set_heightBoard(Game, NewHB, NewGame):-
        change_list_at(1, Game, NewHB, NewGame).


%%% gets the Num of Pieces board from the game
get_numPiecesBoard(Game,NumPiecesBoard):-
        search_list(2, Game, NumPiecesBoard).

%%% updates the num of pieces board
set_numPiecesBoard(Game, NewNPB, NewGame):-
        change_list_at(2, Game, NewNPB, NewGame).


%%% gets the atual player
get_playerToPlay(Game, PlayerToPlay):-
        search_list(3, Game, PlayerToPlay).

%%% updates the game to next player
set_playerToPlay(Game, NextPlayer, NewGame):-
        change_list_at(3, Game, NextPlayer, NewGame).


%%% gets the game state
get_state(Game, State):-
        search_list(4,Game,State).

%%% updates the game state
set_state(Game, State, NewGame):-
        change_list_at(4, Game, State, NewGame).


%%% gets the game mode
get_mode(Game,Mode):-
        search_list(5,Game,Mode).


%% gets the number of flat pieces left
get_numFPieces(Game, NumFPieces):-
       search_list(6,Game,NumFPieces). 

%%% updates the number of flat pieces
set_numFPieces(Game, NumFPieces, NewGame):-
        change_list_at(6, Game, NumFPieces, NewGame).


%%%% gets the number of holed pieces left
get_numHPieces(Game, NumHPieces):-
       search_list(7,Game,NumHPieces). 

%%% updates the number of holed pieces
set_numHPieces(Game, NumHPieces, NewGame):-
        change_list_at(7, Game, NumHPieces, NewGame).


%%% gets the number of double pieces left
get_numDoublePieces(Game, NumDoublePieces):-
       search_list(8,Game,NumDoublePieces). 


%%% updates the number of doubled pieces
set_numDPieces(Game, NumDPieces, NewGame):-
        change_list_at(8, Game, NumDPieces, NewGame).

%%% gets the game level.
get_game_level(Game, Level):-
        search_list(9, Game, Level).

%%% changes the game level.
set_game_level(Game, NextLevel, NewGame):-
        change_list_at(9, Game, NextLevel, NewGame).


%%%%% decrements each piece in the game after they've been moved.
update_piece_info(Game, Piece, NGame):-
        Piece == 'f',
        get_numFPieces(Game, N_f),
        N_f > 0,
        Next_nF is N_f - 1,
        set_numFPieces(Game, Next_nF, NGame).

update_piece_info(Game, Piece, NGame):-
        Piece == 'h',
        get_numHPieces(Game, N_h),
        N_h > 0,
        Next_nH is N_h - 1,
        set_numHPieces(Game, Next_nH, NGame).

update_piece_info(Game, Piece, NGame):-
        (Piece == 'F' ; Piece == 'H'),
        get_numDoublePieces(Game, N_d),
        N_d > 0,
        Next_nD is N_d - 1,
        set_numDPieces(Game, Next_nD, NGame).


