import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const salesData = [
  {
    amount: "+$1,999.00",
    avatar: "https://api.slingacademy.com/public/sample-users/1.png",
    email: "olivia.martin@email.com",
    fallback: "OM",
    name: "Olivia Martin",
  },
  {
    amount: "+$39.00",
    avatar: "https://api.slingacademy.com/public/sample-users/2.png",
    email: "jackson.lee@email.com",
    fallback: "JL",
    name: "Jackson Lee",
  },
  {
    amount: "+$299.00",
    avatar: "https://api.slingacademy.com/public/sample-users/3.png",
    email: "isabella.nguyen@email.com",
    fallback: "IN",
    name: "Isabella Nguyen",
  },
  {
    amount: "+$99.00",
    avatar: "https://api.slingacademy.com/public/sample-users/4.png",
    email: "will@email.com",
    fallback: "WK",
    name: "William Kim",
  },
  {
    amount: "+$39.00",
    avatar: "https://api.slingacademy.com/public/sample-users/5.png",
    email: "sofia.davis@email.com",
    fallback: "SD",
    name: "Sofia Davis",
  },
];

export function RecentSales() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {salesData.map((sale, index) => (
            <div className="flex items-center" key={index}>
              <Avatar className="h-9 w-9">
                <AvatarImage alt="Avatar" src={sale.avatar} />
                <AvatarFallback>{sale.fallback}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm leading-none font-medium">{sale.name}</p>
                <p className="text-muted-foreground text-sm">{sale.email}</p>
              </div>
              <div className="ml-auto font-medium">{sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
