
%%attemps to move the piece to the desired position in the board, and if succeded
%%creates a new game, with all the components updated.

move(Row,Col,Piece,Game,NextGame):-
        get_actual_board(Game, PieceBoard, HeightBoard, NumPiecesBoard),
        
        check_move(Row,Col,Piece,PieceBoard,NumPiecesBoard),
        
        put_piece(Row,Col,Piece,
                  PieceBoard, HeightBoard, NumPiecesBoard,
                  NextPieceBoard, NextHeightBoard, NextNumPiecesBoard),
        
        update_piece_info(Game, Piece, GameInfo),
        \+check_draw(GameInfo, NextGame),
        
        set_pieceBoard(GameInfo, NextPieceBoard, GameInfoP),
        set_heightBoard(GameInfoP, NextHeightBoard, GameInfoPH),
        set_numPiecesBoard(GameInfoPH, NextNumPiecesBoard, GameInfoPHNP),
        
        check_winner(GameInfoPHNP,GameInfoPHNPWinner),
        change_player(GameInfoPHNPWinner, NextGame).


move(Row,Col,Piece,Game,NextGame):-
        get_actual_board(Game, PieceBoard, HeightBoard, NumPiecesBoard),
        check_move(Row,Col,Piece,PieceBoard,NumPiecesBoard),
        put_piece(Row,Col,Piece,
                  PieceBoard, HeightBoard, NumPiecesBoard,
                  NextPieceBoard, NextHeightBoard, NextNumPiecesBoard),
        update_piece_info(Game, Piece, GameInfo),
        \+check_draw(GameInfo, NextGame),!,
        set_pieceBoard(GameInfo, NextPieceBoard, GameInfoP),
        set_heightBoard(GameInfoP, NextHeightBoard, GameInfoPH),
        set_numPiecesBoard(GameInfoPH, NextNumPiecesBoard, GameInfoPHNP),
        change_player(GameInfoPHNP, NextGame).

%%returns the 3 boards of the actual game.
get_actual_board(Game, PieceBoard, HeightBoard, NumPiecesBoard):-
        get_pieceBoard(Game, PieceBoard),
        get_heightBoard(Game, HeightBoard),
        get_numPiecesBoard(Game, NumPiecesBoard).

%%checks if a move is valid, considering the two restrictions in 
%the game.           
check_move(R,C,P,Pb,NPb):-
        check_type(R,C,P,Pb),
        check_number(R,C,NPb).

%%checks if the piece type already on the desired position is not a double one.
check_type(R,C,P,Pb):-
        (P == 'h' ; P == 'f' ; P =='F' ; P == 'H'),
        search_board(R,C,Pb,PieceThere),
        PieceThere \= doubleFlat,
        PieceThere \= doubleHoled.

%%checks if there's less than 2 pieces in the desired position.   
check_number(R,C,NPb):-
        search_board(R,C,NPb,HowManyThere),
        HowManyThere < 2.

%%updates the boards of the game with the new piece.
put_piece(Row,Col,Piece,
          PieceBoard, HeightBoard, NumPiecesBoard,
          NextPB, NextHB, NextNPB):-
        
                get_piece_type(Piece,Type),
                get_piece_height(Type, PieceHeight),
                
                
                search_board(Row, Col, HeightBoard, ActualHeight),
                NextHeight is ActualHeight + PieceHeight,
                
                search_board(Row, Col, NumPiecesBoard, ActualNum),
                NextNum is ActualNum + 1,
                
                change_cell(Row, Col, PieceBoard, Type, NextPB),
                change_cell(Row, Col, HeightBoard, NextHeight, NextHB),
                change_cell(Row, Col, NumPiecesBoard, NextNum, NextNPB).

%%checks if there's a draw: there's no more pieces left to play.
check_draw(Game,NextGame):-
        get_numFPieces(NextGame, FPieces),
        get_numHPieces(NextGame, HPieces),
        get_numDoublePieces(NextGame, DPieces),
        FPieces == 0, HPieces == 0, DPieces == 0,
        set_state(Game,'yes',NextGame),
        nl,write('It\'s a draw!'),nl.
        
%%%%%%%%%%%%%%%%checking of winning conditions%%%%%%%%%%%%%%%%

     
%%%%%%%%%%%% 4-in-a-row horizontal

check_winner(Game,NextGame):-
        get_pieceBoard(Game,Board),
        four_line(Board),
        set_game_winner(Game,NextGame).

%%%%%%%%%%% 4-in-a-row vertical
check_winner(Game,NextGame):-
        get_pieceBoard(Game,Board),
        transpose(Board,TransBoard),
        four_line(TransBoard),
        set_game_winner(Game,NextGame).

%%%%%%%%%%% 4-in-a-row diagonal
check_winner(Game,NextGame):-
        get_pieceBoard(Game,Board),
        get_diagonal(Board,0,Diagonal),
        check_row(Diagonal),
        set_game_winner(Game,NextGame).

%%%%%%%%%%% 4-in-a-row inverse diagonal
check_winner(Game,NextGame):-
        get_pieceBoard(Game,Board),
        reverse(Board,RevBoard),
        get_diagonal(RevBoard,0,Diagonal),
        check_row(Diagonal),
        set_game_winner(Game,NextGame).

%%%%%%%%%%% 3-stair horizontal
check_winner(Game,NextGame):-
        get_heightBoard(Game,Board),
        3-step-win(Board,0),
        set_game_winner(Game,NextGame).

%%%%%%%%%%% 3-stair vertical
check_winner(Game,NextGame):-
        get_heightBoard(Game,Board),
        transpose(Board,TBoard),
        3-step-win(TBoard,0),
        set_game_winner(Game,NextGame).

%%%%%%%%%%% 3-stair horizontal backwards
check_winner(Game,NextGame):-
        get_heightBoard(Game,Board),
        transpose(Board,TBoard),
        reverse(TBoard,RBoard),
        transpose(RBoard,TTBoard),
        3-step-win(TTBoard,0),
        set_game_winner(Game,NextGame).

%%%%%%%%%%% 3-stair vertical backwards
check_winner(Game,NextGame):-
        get_heightBoard(Game,Board),
        transpose(Board,TBoard),
        transpose(TBoard,TTBoard),
        reverse(TTBoard,RBoard),
        transpose(RBoard,TTTBoard),
        3-step-win(TTTBoard,0),
        set_game_winner(Game,NextGame).

%%%%%%%%%%% 3-stair diagonal top-right
check_winner(Game,NextGame):-
        get_heightBoard(Game,Board),
        get_diagonal(Board,0,Diagonal),
        3-step-win-check(Diagonal,0),
        set_game_winner(Game,NextGame).

%%%%%%%%%%% 3-stair diagonal bottom-right
check_winner(Game,NextGame):-
        get_heightBoard(Game,Board),
        reverse(Board,RBoard),
        get_diagonal(RBoard,0,Diagonal),
        3-step-win-check(Diagonal,0),
        set_game_winner(Game,NextGame).

%%%%%%%%%%% 3-stair diagonal bottom-left
check_winner(Game,NextGame):-
        get_heightBoard(Game,Board),
        transpose(Board,TBoard),
        reverse(TBoard,RBoard),
        get_diagonal(RBoard,0,Diagonal),
        3-step-win-check(Diagonal,0),
        set_game_winner(Game,NextGame).

check_winner(Game,NextGame):-
        get_heightBoard(Game,Board),
        get_3_up_diagonal(Board,1,Diagonal),
        write(Diagonal),nl,
        3-step-win-check(Diagonal,0),
        set_game_winner(Game,NextGame).

%%gets a list with the elements of the board top-left/bottom-right diagonal
get_diagonal([],_,[]).
get_diagonal([Head|Tail], Col, [Piece|Rest]):-
        search_list(Col,Head,TempPiece),
        Piece = TempPiece,
        NextCol is Col + 1,
        get_diagonal(Tail,NextCol,Rest).

get_3_up_diagonal([_|_],_,[]).
get_3_up_diagonal([Head|Tail], Col, [Piece|Rest]):-
        search_list(Col,Head,TempPiece),
        Piece = TempPiece,
        write(Piece),nl,
        NextCol is Col + 1,
        NextCol < 3,
        get_diagonal(Tail,NextCol,Rest).

   
four_line([]):- fail.

four_line([Row|NextRows]):-
        check_row(Row);
        four_line(NextRows).

%%checks if there are 4 pieces of the same type or the same height in a row.
check_row(Row):-
        check_type(Row);
        check_height(Row).


check_type([Pivot,Second,Third,Fourth]):-
        mainType(Pivot,MainType),
        MainType \= empty,
        mainType(Second,MainType),
        mainType(Third,MainType),
        mainType(Fourth,MainType).
        

check_height([Pivot,Second, Third, Fourth]):-
        height(Pivot,Height),
        Height \= 0,
        height(Second,Height),
        height(Third,Height),
        height(Fourth,Height).


3-step-win([_|_],_):-fail.

%%%checks every row of the HeightBoard to find a sequence of 3-2-1
3-step-win([Head|Tail],Col):-
        3-step-win-check(Head,Col);
        Col1 is Col + 1,
        3-step-win-check(Head,Col1);
        3-step-win(Tail, 0). 

%%% checks if there's a sequence of 3-2-1 in a row of the heightBoard    
3-step-win-check(Row,Col0):-
       search_list(Col0,Row,Height1),
       Height1 == 3,
       %write('Found first'),nl,
       Col1 is Col0+1,
       search_list(Col1,Row,Height2),
       Height2 == 2,
       %write('Found second'),nl,
       Col2 = Col1+1,
       search_list(Col2,Row,Height3),
       Height3 == 1.
       %write('Found third').       
        
           
        
        
        