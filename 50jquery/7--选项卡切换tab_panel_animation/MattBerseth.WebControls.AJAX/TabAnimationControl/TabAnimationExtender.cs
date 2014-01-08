using System.Web.UI.WebControls;
using System.Web.UI;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Globalization;
using AjaxControlToolkit;

[assembly: System.Web.UI.WebResource("MattBerseth.WebControls.AJAX.TabAnimationControl.TabAnimationBehavior.js", "text/javascript")]

namespace MattBerseth.WebControls.AJAX.TabAnimationControl
{
    /// <summary>
    /// 
    /// </summary>
    [Designer("MattBerseth.WebControls.AJAX.TabAnimationControl.TabAnimationExtenderDesigner, MattBerseth.WebControls.AJAX")]
    [ClientScriptResource("MattBerseth.WebControls.AJAX.TabAnimationControl.TabAnimationBehavior", "MattBerseth.WebControls.AJAX.TabAnimationControl.TabAnimationBehavior.js")]
    [RequiredScript(typeof(AnimationScripts))]
    [RequiredScript(typeof(CommonToolkitScripts))]
    [RequiredScript(typeof(AnimationExtender))]
    [TargetControlType(typeof(TabContainer))]
    [ToolboxItem("System.Web.UI.Design.WebControlToolboxItem, System.Design, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a")]
    public class TabAnimationExtender : AnimationExtenderControlBase
    {
        // Animations
        private Animation _activeTabChanged;

        /// <summary>
        /// 
        /// </summary>
        [DefaultValue(null)]
        [Browsable(false)]
        [ExtenderControlProperty]
        public Animation OnActiveTabChanged
        {
            get { return this.GetAnimation(ref this._activeTabChanged, "OnActiveTabChanged"); }
            set { this.SetAnimation(ref this._activeTabChanged, "OnActiveTabChanged", value); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="e"></param>
        protected override void OnPreRender(System.EventArgs e)
        {
            base.OnPreRender(e);

            this.ResolveControlIDs(this._activeTabChanged);
        }
    }
}
