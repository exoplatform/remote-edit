import org.w3c.dom.Element;

import javax.portlet.*;
import java.io.IOException;

/**
 * Created by The eXo Platform SEA
 * Author : eXoPlatform
 * toannh@exoplatform.com
 * On 12/16/14
 * A simple Open document portlet
 */
public class UIOpenDocumentPortlet extends GenericPortlet {

  @RenderMode(name = "view")
  public void openDocument(RenderRequest request, RenderResponse response) throws IOException, PortletException {}

  @Override
  protected void doHeaders(RenderRequest request, RenderResponse response) {

    Element script = response.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", request.getContextPath()+"/js/ITHitWebDAVClient.js");
    response.addProperty(MimeResponse.MARKUP_HEAD_ELEMENT, script);
  }

}