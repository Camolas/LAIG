
%%% predicates to run when the player is the machine
machineTurn(Game,NextGame):-
        get_actual_board(Game, PieceBoard, HeightBoard, NPBoard),
        display_board(PieceBoard,4,NPBoard,HeightBoard),
        get_game_level(Game, Level),
        repeat,
        display_actualInfo(Game),
        (Level == 1 -> level_1_move(Row,Col,Piece)
        ;
                (Level == 2 -> level_2_move(PieceBoard, Row, Col, Piece))
        ),
        
        move(Row,Col,Piece,Game,NextGame),
        !.


level_1_move(Row, Col, Piece):-
        random(1,5,TempRow),
        random(0,4,Col),
        Row is 4 - TempRow,
        number_char(Col,TempCol),
                
        get_machine_piece(TempPiece),
        parse_piece(TempPiece,Piece),
        get_piece_type(Piece,Type),
        
        display_machine_move(TempRow, TempCol, Type).


level_2_move(PieceBoard,Row,Col,Piece):-
        get_empty_cells(PieceBoard,0,List),
        %write('Got here!'),nl,
        length(List,Len),
        random(0, Len, Rand1),
        search_list(Rand1, List, List2),
        
        length(List2,Len2),
        random(0, Len2, Rand2),
        %write(List2),nl,
        get_level_2_position(List2, Rand2, Row, Col),
        %write(Row), write('   '), write(Col),nl,
        TempRow is 4 - Row,
        number_char(Col,TempCol),
        
        
        get_machine_piece(TempPiece),
        parse_piece(TempPiece,Piece),
        get_piece_type(Piece,Type),
        
        display_machine_move(TempRow, TempCol, Type).
        

get_level_2_position(List, Rand,Row,Col):-
        search_list(Rand,List,[Col|TempRowList]),
        search_list(0,TempRowList,Row).

get_empty_cells(_,3,_).

get_empty_cells(Head,3,List):-
        analyse_row(Head,3,0,List).
              
get_empty_cells([Head|Tail],Row,[HeadList|TailList]):-
       analyse_row(Head,Row,0,HeadList),
       NextRow is Row + 1,
       get_empty_cells(Tail, NextRow, TailList). 

analyse_row(List,Row,3,[[Col_Empty,Row_Empty]|_]):-
       search_list(3,List,Piece), 
       Piece == empty,
       Col_Empty = 3,
       Row_Empty = Row.
            
analyse_row(List, Row, Col,[[Col_Empty,Row_Empty]|ListTail]):-
       search_list(Col,List,Piece), 
       (Piece == empty ->
                (Col_Empty = Col,
                Row_Empty = Row,
                NextCol is Col + 1,
                analyse_row(List, Row, NextCol,ListTail))
       ;
                (NextCol is Col + 1,
                analyse_row(List, Row, NextCol, [[Col_Empty,Row_Empty]|ListTail]))
        ). 

           
%%% returns the desired piece from the machine turn
get_machine_piece(Piece):-
        random(0,4,Random),
        generate_piece(Random,Piece),
        !.


%%% generates the piece from the value returned from the random function.
generate_piece(Random,f):-
        Random == 0.

generate_piece(Random,h):-
        Random == 1.

generate_piece(Random,ff):-
        Random == 2.

generate_piece(Random,hh):-
        Random == 3.

%%% shows the random position and piece to move.
display_machine_move(Row, Col, Piece):-
        
        write('Machine puts '), write(Piece), write(' in '),
        write(Col),write(Row),nl,nl.


