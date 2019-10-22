import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {State} from './State';
import {Location} from './Location';

@Entity()
export class Option {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ width: 100, type: String })
    link: string;

    @Column({ width: 50, type: String })
    adress: string;

    @Column({ width: 20, type: String })
    contact: string;

    @Column({ width: 1, type: Number })
    checked: number;

    @ManyToOne(type => State, state => state.option)
    state: State;

    @ManyToOne(type => Location, location => location.option)
    location: Location;

    @Column({ width: 250, type: String })
    notes: string;

    @Column({ width: 2, type: String })
    doesLike: string;

}