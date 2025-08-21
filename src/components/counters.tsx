import type{ReactNode} from "react"; 

export defaut function Counters ({
    total,
    pending, 
    done,
}:{
    total: number;
     pending number;
     done: number;

}) {
    const completionRate = total > 0 ? Math.round ((done / total) * 100 ) : 0;

    return (

 <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
      <Badge>Totais: { total} </Badge> 
       <Badge>pendente: { pending} </Badge>
        <Badge>concluídos: { done} </Badge>
  </div> 

   {total > 0 && (
        <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
          <span className="font-medium">{completionRate}% completo</span>
          <div className="flex-1 max-w-md bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: ${completionRate}% }}
            ></div>
          </div>
        </div>

    )} 
    </div>

  );
}
    
function Badge ({children }: {children: ReactNode}) {
    return (
        <span className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-gray-700 shadow-sm dark:border-gray-600 dark:bg-neutral-800 dark:text-gray-200">
      {children}
    </span>
    ); 
}


