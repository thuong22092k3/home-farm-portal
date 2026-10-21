import { AppCard } from "@/components/app-card";
import { AppContainer } from "@/components/app-container";
import {
  SkeletonForm,
  SkeletonTable,
  SkeletonText,
} from "@/components/app-skeleton";

type AppLoadingProps = {
  variant?: "table" | "detail";
  title?: string;
  subTitle?: string;
  tableColumns?: number;
  tableRows?: number;
};

function AppLoading({
  variant = "table",
  title,
  subTitle,
  tableColumns = 6,
  tableRows = 5,
}: AppLoadingProps) {
  if (variant === "detail") {
    return (
      <AppContainer title={title} subTitle={subTitle}>
        <div className="mt-6 space-y-6">
          <AppCard className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <SkeletonText
                  lines={2}
                  className="space-y-3"
                  lineClassName="h-5"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-xl border bg-muted/20 p-4">
                  <SkeletonText lines={2} className="space-y-3" />
                </div>
              ))}
            </div>
          </AppCard>

          <AppCard>
            <SkeletonForm fields={4} showSubmit={false} />
          </AppCard>

          <AppCard>
            <SkeletonText lines={5} className="space-y-4" lineClassName="h-4" />
          </AppCard>
        </div>
      </AppContainer>
    );
  }

  return (
    <AppContainer title={title} subTitle={subTitle}>
      <div className="mt-6 space-y-6">
        <AppCard>
          <SkeletonForm fields={3} showSubmit={false} />
        </AppCard>
        <AppCard>
          <SkeletonTable rows={tableRows} columns={tableColumns} />
        </AppCard>
      </div>
    </AppContainer>
  );
}

export { AppLoading, type AppLoadingProps };
