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
  public void OpenDocument(RenderRequest request, RenderResponse response) throws IOException, PortletException {}

}