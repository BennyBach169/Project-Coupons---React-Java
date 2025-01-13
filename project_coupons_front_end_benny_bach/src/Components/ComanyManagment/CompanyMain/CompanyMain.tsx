import { useEffect, useState } from "react";
import { Coupon } from "../../../models/Coupon";
import "./CompanyMain.css";
import { AnimatedCircle } from "../../AnimatedCircle/AnimatedCircle";
interface CouponsProps{
    coupons:Coupon[];
    soldTotal:number;

}
export function CompanyMain(props:CouponsProps): JSX.Element {

    function lowAmount(){
        let count:number =0;
        for(let c of props.coupons){
            if(c.amount<=10){
                count++;
            }
        }
        return count;
    }
 

    return (
        <div className="CompanyMain">
            <h2>Welcome Back</h2>
            <div className="StatsDisplay-c">
            <AnimatedCircle number={props.coupons.length} text="Total Coupons"/>
            <AnimatedCircle number={lowAmount()} text="On Low Amount"/>
            <AnimatedCircle number={props.soldTotal} text="Sold"/>
            </div>
        </div>
    );
}
