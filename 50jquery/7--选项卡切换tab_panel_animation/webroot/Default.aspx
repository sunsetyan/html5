<%@ Page Language="C#" %>
<%@ Register Assembly="MattBerseth.WebControls.AJAX" Namespace="MattBerseth.WebControls.AJAX.TabAnimationControl" TagPrefix="mb" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
    <link rel="stylesheet" type="text/css" href="stylesheet.css" />
</head>
<body>
    <form id="frm" runat="server">
        <asp:ScriptManager runat="server" />
        <p>
            A sample that show how you can add tab transition animations to your existing Tab Panel Controls.
        </p>
        <div>
            <h3>JQuery Tab Skin</h3>
            <ajaxToolkit:TabContainer ID="jquery" runat="server" CssClass="ajax__tab_jquery-theme" Width="500px">
                <ajaxToolkit:TabPanel runat="server" HeaderText="One">
                    <ContentTemplate>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.                        
                    </ContentTemplate>
                </ajaxToolkit:TabPanel>
                <ajaxToolkit:TabPanel runat="server" HeaderText="Two">
                    <ContentTemplate>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.                        
                    </ContentTemplate>
                </ajaxToolkit:TabPanel>
                <ajaxToolkit:TabPanel runat="server" HeaderText="Three">
                    <ContentTemplate>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.                        
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.                        
                    </ContentTemplate>
                </ajaxToolkit:TabPanel>
            </ajaxToolkit:TabContainer> 
            <mb:TabAnimationExtender runat="server" TargetControlID="jquery">
                <Animations>
                    <OnActiveTabChanged>
                        <FadeIn />
                    </OnActiveTabChanged>
                </Animations>
            </mb:TabAnimationExtender>            
            <br />
        </div>
    </form>    
</body>
</html>
