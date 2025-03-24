
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Tag, Percent } from "lucide-react";

const ClientPromotions = () => {
  // Sample data - in a real app, this would come from an API or database
  const promotions = [
    {
      id: 1,
      title: "50% off your first project",
      description: "New client special offer - get half off on your first project.",
      validUntil: "30 Jun 2023",
      discount: "50%",
      code: "WELCOME50",
    },
    {
      id: 2,
      title: "Premium creators at standard rates",
      description: "Access top-rated creators without premium fees this month.",
      validUntil: "15 Jun 2023",
      discount: "Premium Access",
      code: "PREMIUM2023",
    },
    {
      id: 3,
      title: "Free consultation calls",
      description: "Book a free 30-minute consultation with any creator.",
      validUntil: "Ongoing",
      discount: "Free Service",
      code: "CONSULT30",
    },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Special Offers</CardTitle>
        <CardDescription>Exclusive promotions for you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="p-4 rounded-xl border border-border bg-background hover:bg-muted/10 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-2 bg-pink-100 dark:bg-pink-900/30">
                    <Percent size={16} className="text-pink-500" />
                  </div>
                  <h3 className="font-medium">{promo.title}</h3>
                </div>
                <Badge variant="outline" className="bg-pink-50 border-pink-200 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800">
                  {promo.discount}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{promo.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Clock size={12} /> Valid until: {promo.validUntil}
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Tag size={12} /> Code: <span className="font-mono bg-muted p-1 rounded text-xs">{promo.code}</span>
                  </span>
                </div>
                <Button size="sm" variant="ghost" className="text-custom-secondary hover:text-custom-secondary/80">
                  Apply <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientPromotions;
