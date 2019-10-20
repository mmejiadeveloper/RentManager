import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import {Option} from './Option';


@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ width: 50, type: String })
    name: string;

    @OneToMany(type => Option, option => option.state)
    option: Option[];

}