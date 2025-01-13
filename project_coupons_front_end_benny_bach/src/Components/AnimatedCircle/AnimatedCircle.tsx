import { useEffect, useState } from "react";
import "./AnimatedCircle.css";

interface DataProps{
    number:number;
    text:string;
}

export function AnimatedCircle(props:DataProps): JSX.Element {

    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        let currentCount = 0;
        const interval = setInterval(() => {
            if (currentCount < props.number) {
                currentCount++;
                setTotalCount(currentCount);
            } else {
                clearInterval(interval);
            }
        }, 50); 
        return () => clearInterval(interval); 
    }, [props.number]);
    return (
        <div className="AnimatedCircle">
			 <h3 id="Stats">{props.text}
            <div className="circle">{totalCount}</div>
            </h3>
        </div>
    );
}
