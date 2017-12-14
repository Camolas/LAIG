
%%%%%%% Returns the element on the desired position of a generic list.
search_list(0,[Head|_],Head).

%% gets the element on the Index position of a generic list.
search_list(Index,[_|Tail],Char):-
        Index > 0,
        NextIndex is Index-1,
        search_list(NextIndex,Tail,Char).

change_list_at(0,[_|Tail], NewInput, [NewInput|Tail]).

%%%changes the Index element of a generic list.
change_list_at(Index,[Head|ActualTail], NewInput, [Head|NextTail]):-
        Index > 0,
        NextIndex is Index - 1,
        change_list_at(NextIndex, ActualTail, NewInput, NextTail).

get_return_key:-
        get_code(_).

%%% converts the input to the respective number.
%%% example: when the user types "Col: a", it changes the coumn value to 0.
get_col(Col):-
        get_char(Input),
        get_return_key,
        char_number(Input,Col).

search_board(0, Col, [Head|_], Piece):-
        search_list(Col, Head, Piece).

%%% returns the element on the desired position of a matrix.
search_board(Row, Col, [_|Tail], Piece):-
        Row > 0,
        NextRow is Row - 1,
        search_board(NextRow, Col, Tail, Piece).

change_cell(0, Col, [Head|ActualTail], NewInput, [NextHead|ActualTail]):-
        change_list_at(Col, Head, NewInput, NextHead).

%%% changes the element on the desired position in the matrix.      
change_cell(Row, Col, [Head|ActualTail], NewInput, [Head|NextTail]):-
        Row > 0,
        NextRow is Row - 1,
        change_cell(NextRow, Col, ActualTail, NewInput, NextTail).


%%% changes the actual player, depending on the mode

%%% human-human
change_player(Game,NextGame):-
        get_mode(Game,Mode),
        Mode == hh,
        get_playerToPlay(Game,ActualPlayer),
        (ActualPlayer == player_1 -> NextPlayer = player_2;
         ActualPlayer == player_2 -> NextPlayer = player_1),
        set_playerToPlay(Game,NextPlayer,NextGame).

%%% human - machine
change_player(Game,NextGame):-
        get_mode(Game,Mode),
        Mode == hm,
        get_playerToPlay(Game,ActualPlayer),
        (ActualPlayer == player_1 -> NextPlayer = machine;
         ActualPlayer == machine -> NextPlayer = player_1),
        set_playerToPlay(Game,NextPlayer,NextGame).

%%% machine-machine
change_player(Game,NextGame):-
        get_mode(Game,Mode),
        Mode == mm,
        set_playerToPlay(Game,machine,NextGame).

%%% returns a list with a row from the matrix.
get_board_row(Row,Board,RowList):-
        nth0(Row,Board,RowList).                  
                                       
initialize_random_seed:-
        now(Usec), Seed is Usec mod 30269,
        getrand(random(X, Y, Z, _)),
        setrand(random(Seed, X, Y, Z)), !.

%%% changes the input for double pieces, returning the char to be shown in the board.
%%%user types "ff" and it changes to "F".
parse_piece(TempPiece,Piece):-
        ((TempPiece == 'f' ; TempPiece == 'h') -> Piece = TempPiece
        ;       (TempPiece == 'ff' -> Piece = 'F'
                ;    (TempPiece == 'hh' -> Piece = 'H')
                )
        ). 

             
%%% checks if the input for the position is valid.
parse_position(Row,Col):-
        Row >= 0,
        Row =< 3,
        Col >=0,
        Col =< 3.
            
