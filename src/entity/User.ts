import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ width: 30, type: String })
    name: string;

    @Column({ width: 1, type: Number })
    read: Number;

    @Column({ width: 1, type: Number })
    write: Number;

}