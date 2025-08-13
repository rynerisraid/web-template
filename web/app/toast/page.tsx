"use client";

import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";

export default function SonnerDemo() {
  const { toast: customToast } = useToast();

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Toast 示例</h1>
          <p className="text-muted-foreground">
            各种不同类型的 Toast 消息示例
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4 rounded-lg border p-6">
            <h2 className="text-xl font-semibold">基础 Toast</h2>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => toast("这是基础消息")}
              >
                显示基础 Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.success("操作成功")}
              >
                显示成功 Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.error("操作失败")}
              >
                显示错误 Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.warning("警告信息")}
              >
                显示警告 Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.info("信息提示")}
              >
                显示信息 Toast
              </Button>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border p-6">
            <h2 className="text-xl font-semibold">带描述的 Toast</h2>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  toast.success("事件已创建", {
                    description: "2023年12月3日 星期日 上午9:00",
                  })
                }
              >
                带描述的成功消息
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast.error("操作失败", {
                    description: "请检查您的输入并重试",
                  })
                }
              >
                带描述的错误消息
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast.warning("网络连接不稳定", {
                    description: "您的更改可能未保存",
                  })
                }
              >
                带描述的警告消息
              </Button>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border p-6">
            <h2 className="text-xl font-semibold">带操作的 Toast</h2>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  toast.success("事件已创建", {
                    description: "2023年12月3日 星期日 上午9:00",
                    action: {
                      label: "撤销",
                      onClick: () => console.log("撤销操作"),
                    },
                    icon: "🎉",
                    duration: 5000,
                  })
                }
              >
                带操作和图标
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast("需要您注意", {
                    description: "这是一个重要的通知",
                    action: {
                      label: "查看详情",
                      onClick: () => console.log("查看详情"),
                    },
                  })
                }
              >
                带操作的通知
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast.error("删除失败", {
                    description: "服务器暂时不可用",
                    action: {
                      label: "重试",
                      onClick: () => console.log("重试操作"),
                    },
                  })
                }
              >
                带操作的错误消息
              </Button>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border p-6">
            <h2 className="text-xl font-semibold">自定义 Toast</h2>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  customToast({
                    title: "自定义 Toast",
                    description: "使用 useToast 钩子创建的消息",
                    variant: "default",
                  });
                }}
              >
                自定义默认消息
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  customToast({
                    title: "操作失败",
                    description: "请重试或联系支持",
                    variant: "destructive",
                    action: (
                      <ToastAction
                        altText="重试"
                        onClick={() => console.log("重试操作")}
                      >
                        重试
                      </ToastAction>
                    ),
                  });
                }}
              >
                自定义错误消息
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  customToast({
                    title: "更新可用",
                    description: "新版本已准备就绪，点击重新加载",
                    variant: "default",
                    action: (
                      <ToastAction
                        altText="重新加载"
                        onClick={() => window.location.reload()}
                      >
                        重新加载
                      </ToastAction>
                    ),
                  });
                }}
              >
                自定义带操作消息
              </Button>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border p-6">
            <h2 className="text-xl font-semibold">高级 Toast</h2>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  toast.promise(
                    new Promise((resolve) => setTimeout(() => resolve({}), 2000)),
                    {
                      loading: "正在上传...",
                      success: "上传成功!",
                      error: "上传失败",
                    }
                  );
                }}
              >
                Promise Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  toast.custom((t) => (
                    <div className="flex items-center gap-2 rounded-lg border bg-background p-4 shadow-lg">
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                      <div>
                        <p className="font-medium">自定义样式</p>
                        <p className="text-sm text-muted-foreground">这是完全自定义的 Toast</p>
                      </div>
                    </div>
                  ));
                }}
              >
                完全自定义 Toast
              </Button>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border p-6">
            <h2 className="text-xl font-semibold">主题适配 Toast</h2>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  document.documentElement.classList.contains('dark') ? 
                    toast("深色主题激活") : 
                    toast("浅色主题激活");
                }}
              >
                主题检测消息
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  toast("主题适配消息", {
                    description: "此消息会根据当前主题显示不同的样式",
                    action: {
                      label: "切换主题",
                      onClick: () => {
                        document.documentElement.classList.toggle('dark');
                        toast.success(
                          document.documentElement.classList.contains('dark') ? 
                            "已切换到深色主题" : 
                            "已切换到浅色主题"
                        );
                      },
                    },
                  });
                }}
              >
                可切换主题消息
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}